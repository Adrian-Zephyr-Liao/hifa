import path from 'path'
import fastGlob from 'fast-glob'
import { normalizePath } from 'vite'

interface RouteMeta {
  routePath: string
  absolutePath: string
}

export class RouteService {
  #scanDir: string
  #routeData: RouteMeta[] = []
  constructor(scanDir: string) {
    this.#scanDir = scanDir
  }

  async init() {
    const files = fastGlob
      .sync(['**/*.{vue,md,mdx,ts,tsx,js,jsx}'], {
        cwd: this.#scanDir,
        absolute: true,
        ignore: ['**/node_modules/**', '**/build/**', 'hifa.config.ts', 'hifa.config.js'],
      })
      .sort()
    files.forEach(file => this.addRoute(file))
  }

  // 获取路由数据，方便测试
  getRouteMeta(): RouteMeta[] {
    return this.#routeData
  }

  normalizeRoutePath(rawPath: string) {
    const routePath = rawPath.replace(/\.(.*)?$/, '').replace(/index$/, '')
    return routePath.startsWith('/') ? routePath : `/${routePath}`
  }

  generateRoutesCode() {
    return `
  ${this.#routeData
  .map((route, index) => {
    return `const Route${index} = () => import('${route.absolutePath}');`
  })
  .join('\n')}
  export const routes = [
  ${this.#routeData
    .map((route, index) => {
      return `{ path: '${route.routePath}', component: Route${index} }`
    })
    .join(',\n')}
  ];
  `
  }

  addRoute(file: string) {
    const fileRelativePath = normalizePath(
      path.relative(this.#scanDir, file),
    )
    // 1. 路由路径
    const routePath = this.normalizeRoutePath(fileRelativePath)
    // 2. 文件绝对路径
    this.#routeData.push({
      routePath,
      absolutePath: file,
    })
  }

  removeRoute(filePath: string) {
    const fileRelativePath = path.relative(this.#scanDir, filePath)
    const routePath = this.normalizeRoutePath(fileRelativePath)
    this.#routeData = this.#routeData.filter(
      route => route.routePath !== routePath,
    )
  }
}
