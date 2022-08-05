const {static: staticSQL} = require("./../core/sql/controller");

const Static = {};

Static.static = async (parent, params) => {
  const data = await staticSQL.get(params.page);
  if(data.error) throw new Error(data.error);
  const pageData = data.result;
  return { html:pageData.content, label: pageData.label, createdAt:pageData.createdAt, updatedAt:pageData.updatedAt};
}

module.exports = Static;