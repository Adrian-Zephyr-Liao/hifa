import { resolve } from 'path'
import { resolveConfig } from '../config'
describe('config', () => {
  it('should resolve config', async () => {
    const config = await resolveConfig(resolve(process.cwd(), './docs'), 'serve', 'development')
    expect(config).toMatchObject({
      configPath: resolve(process.cwd(), './docs', 'hifa.config.ts'),
      root: resolve(process.cwd(), './docs'),
      siteData: {
        description: expect.anything(),
        themeConfig: {},
        title: expect.anything(),
        vite: {},
      },
    })
  })
})
