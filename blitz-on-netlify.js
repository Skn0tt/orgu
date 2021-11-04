const essentialNextjs = require("@netlify/plugin-nextjs")
const originalGetHandler = require("@netlify/plugin-nextjs/lib/templates/getHandler")

/**
 * @param {string} value
 * @param {{ after: string, insert: string }}
 */
function insert(value, { after, insert }) {
  const [prefix, postfix] = value.split(after)
  return prefix + after + insert + postfix
}

function getHandler(args) {
  const { publishDir } = args

  const handlerCode = originalGetHandler(args)

  return insert(handlerCode, {
    after: `required-server-files.json")`,
    insert: `
const { middleware: blitzMiddleware } = require("${publishDir}/../.blitz.config.compiled.js");
config.middleware = blitzMiddleware;
`,
  })
}

module.exports = {
  ...essentialNextjs,
  async onBuild(args) {
    await essentialNextjs.onBuild({
      ...args,
      getHandler,
    })
  },
}
