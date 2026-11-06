# 改用 GitHub 托管

2026-11-06，用户要求网页部署在GitHub而非ChatGPT。自此停止Sites新增发布与失败重试；旧部署记录仅作为历史，不是继续发布指令。

当前GitHub仓库SelinLee/lens-evidence-atlas为个人账号下的私有仓库。读取仓库API确认has_pages=false；Pages接口404，尚未启用。用户计划字段未返回，不能认定已经具备私有仓库发布Pages的套餐资格。

## 已准备

`.github/workflows/pages.yml`：手动触发，先运行测试/构建并检查dist一致性，仅上传dist为Pages产物，再部署。复用现有查询页，无外部运行时依赖，CSS/JS/JSON使用相对路径，适配项目子路径。尚未启用Pages或触发公开发布。

## 发布前待确定

用户先前要求项目私有。个人仓库的GitHub Pages网页默认可公开访问，源仓库私有并不使网页私有；网站还包含可下载的catalog.json，允许网页公开即包含已收录的研究数据。私有Pages访问控制要求GitHub Enterprise Cloud组织拥有私有/内部项目仓库。

需确认网页是否允许公开；不擅自公开仓库、迁移组织、升级付费套餐或假设前端密码可保护静态数据。若用户允许网页公开，仍保持代码仓库私有，核实当前账号是否支持私有仓库Pages；再启用Actions发布、记录实际URL及部署成功状态。用户要求网页也私有时，需具备合适的企业组织，当前个人仓库不能承诺满足。

依据：[GitHub Pages可用计划](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)、[私有站点访问控制](https://docs.github.com/en/enterprise-cloud%40latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)、[自定义发布工作流](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。
