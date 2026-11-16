/* Загружает модули приложения в изолированный контекст так же, как браузер. */
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const ORDER = ["data/meta.js", "data/references.js", "data/views.js", "data/anomalies.js", "data/quiz.js", "data/images.js", "validate.js", "search.js", "progress.js", "schemes.js"];
function load() {
  const ctx = {}; vm.createContext(ctx);
  ORDER.forEach(f => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f }));
  return ctx.FN;
}
module.exports = { load, ROOT, ORDER };
