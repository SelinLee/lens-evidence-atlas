# Lens Evidence Atlas · 透镜评价证据库

> 2026-11-06托管调整：用户要求改用GitHub，停止Sites发布。GitHub Pages方案已准备，网页可见性待确认；见[迁移状态](docs/GITHUB_PAGES_MIGRATION.md)。历史Sites地址不代表新的发布目标。

按应用查询透镜指标的定义、重要性依据与性能参考。仓库与在线站点目前均按**私有**管理。

- [私有查询网页](https://lens-evidence-atlas.tasty-pixie-6380.chatgpt.site)
- [证据与比较规则](docs/EVIDENCE_POLICY.md)
- [贡献与更新方法](CONTRIBUTING.md)
- [维护路线图及缺口](docs/ROADMAP.md)
- [Dot 维护任务说明（可复用 prompt）](docs/DOT_MAINTENANCE.md)
- [证据补齐任务清单（状态与验收）](docs/EVIDENCE_BACKLOG.md)
- [研究日志与续接检查点](docs/RESEARCH_LOG.md)
- [本机研究维护目标](docs/LOCAL_RESEARCH_GOAL.md)
- [第一批审计与核验记录](docs/AUDIT_2026-11-06.md)

## 当前范围

当前 v0.1.8：33 类应用、67 条商业/科研/规范记录、87 个来源条目与21个指标定义（同一论文的主文和补充材料不算独立研究）。第一批新增或复核条目单独记录 2026-11-06 核验范围；其余旧数值保留 2026-10-25 日期，不视为全库重验。

**尚未建立原文明示的跨应用排名或世界纪录榜。** 6 类应用提供有引用的编辑性优先级；显微物镜页新增1组作者明示的限定研发任务比较，不代表整个应用的通用排名。其余应用显示待补证。当前收录两种限定范围最佳解释：Richards 论文内最佳样品范围，以及理想模式匹配效率界限。不能把代表性产品或单一论文当作全球最优。

数据的缺口是资料库的一部分，不通过猜数或自动排名填补。

## 本地运行

需要 Node.js 22 或更新版本；没有第三方运行时依赖。

```sh
npm test
npm run build
npm start
```

打开 http://127.0.0.1:4178 。也可直接在 Chrome 打开 `dist/index.html`，四个网页文件与 JSON 保持在同一目录；正文查询不依赖服务器。外部原文链接需要联网。

## 目录

```text
data/applications/    应用、指标映射与有出处的优先级
data/metrics/         定义、单位、优化方向、比较前提及定义出处
data/sources/         论文/标准/原厂来源，DOI、原文位置及阅读范围
data/benchmarks/      产品与科研结果、条件、缺失项
data/scoped_bests.json 仅在明确范围内成立的最佳值或理论界限
web/                  查询界面源码
scripts/              校验、确定性构建、只读链接审计
schema/               JSON Schema 编辑契约
tests/                引用及排名规则的反例测试
dist/                 生成网页；随数据修改重建并提交
```

## 更新与发布

通过任务清单/Issue → 数据修改 → 测试/构建 → PR 审核 → 私有部署维护。Dot 每批先认领稳定任务 ID，完成后更新清单状态及研究日志；详见 [维护任务说明](docs/DOT_MAINTENANCE.md)。文档与清单的保存不代表已启动后台研究。

GitHub Actions 检查引用完整性、比较约束和生成文件是否过期，并保存私有构建制品。它**不启用公开 GitHub Pages**。

GitHub 仓库私有并不自动让 Pages 私有。在线版本使用独立的 Sites 登录访问控制。更改仓库或站点访问范围必须由维护者明确决定。

Sites 部署使用 `.openai/hosting.json` 的已存在项目 ID。通过 Sites 的仓库凭据推送同一版本、打包并调用私有部署；不要创建重复站点，不要提交任何 Token。GitHub `origin` 是主维护仓库，Sites 可使用单独的 `sites` 远程或独立发布 checkout。

## 来源与使用

保留来源链接及简短的中文释义，不收录整篇论文 PDF 或付费标准全文。来源文件和产品名称的权利归原权利人。仓库目前不授予开源许可；未来公开前需另行决定代码与资料的许可范围。
