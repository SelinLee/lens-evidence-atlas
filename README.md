# Lens Evidence Atlas · 透镜评价证据库

> 2026-11-06托管调整：用户要求改用GitHub，停止Sites发布。GitHub Pages已上线；用户最新确认仓库与网页均公开；见[迁移状态](docs/GITHUB_PAGES_MIGRATION.md)。历史Sites地址不代表新的发布目标。

按应用查询透镜指标的定义、重要性依据与性能参考。仓库与查询网页均按用户确认**公开**。

- [GitHub Pages 查询网页](https://selinlee.github.io/lens-evidence-atlas/)
- [证据与比较规则](docs/EVIDENCE_POLICY.md)
- [贡献与更新方法](CONTRIBUTING.md)
- [维护路线图及缺口](docs/ROADMAP.md)
- [Dot 维护任务说明（可复用 prompt）](docs/DOT_MAINTENANCE.md)
- [证据补齐任务清单（状态与验收）](docs/EVIDENCE_BACKLOG.md)
- [研究日志与续接检查点](docs/RESEARCH_LOG.md)
- [本机研究维护目标](docs/LOCAL_RESEARCH_GOAL.md)
- [第一批审计与核验记录](docs/AUDIT_2026-11-06.md)

## 手机与 AR/VR 新主线（v0.2.5）

[型号指标表与散点/折线图](https://selinlee.github.io/lens-evidence-atlas/devices.html)：5款手机的15个后摄配置、8款AR/VR设备、27个字段。支持双轴指标、型号/列多选、排序、CSV/SVG导出和恢复分享视图；未知不补零，厂商标称不等于同条件实测。定义词典的学术出处及独立质量测量仍待补。详见[发布验收记录](docs/DEVICE_RELEASE_2026-11-14.md)。

## 历史范围

当前目录 v0.1.33：33 类应用、90 条商业/科研/规范记录、127 个来源条目与45个指标定义（同一论文的主文和补充材料不算独立研究）。新增或复核条目分别记录实际核验日期与范围；其余旧数值保留 2026-10-25 日期，不视为全库重验。

**尚未建立原文明示的跨应用排名或世界纪录榜。** 1 类应用提供有引用的编辑性优先级；显微物镜页新增1组作者明示的限定研发任务比较，不代表整个应用的通用排名。光片、阵列、单模耦合、远心、机器视觉、OCT、近红外、热成像与短波红外页提供有出处的任务权衡，不再给统一P1/P2；其余应用显示待补证。当前收录两种限定范围最佳解释：Richards 论文内最佳样品范围，以及理想模式匹配效率界限。不能把代表性产品或单一论文当作全球最优。

显微物镜页提供[低NA条件对照](https://selinlee.github.io/lens-evidence-atlas/#app_04/compare)：从六条记录选择两项，逐字段查看参数、出处及不可直接排名的原因。六条记录来自五项研究；同文元件与扫描实验不当独立来源。

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

通过任务清单/Issue → 数据修改 → 测试/构建 → PR 审核 → GitHub Pages 发布维护。Dot 每批先认领稳定任务 ID，完成后更新清单状态及研究日志；详见 [维护任务说明](docs/DOT_MAINTENANCE.md)。文档与清单的保存不代表已启动后台研究。

GitHub Actions检查引用完整性、比较约束和生成文件是否过期。主分支更新通过`.github/workflows/pages.yml`测试并构建后，将dist发布到GitHub Pages；工作流成功和网页实际可读均应核验。

用户已批准源码与网页公开，catalog.json等网页资料同样公开。维护记录不得包含凭据或无授权再分发的全文。旧Sites发布记录仅保留历史；停止创建或重试Sites部署，迁移说明见[GitHub托管](docs/GITHUB_PAGES_MIGRATION.md)。

## 来源与使用

保留来源链接及简短的中文释义，不收录整篇论文PDF或付费标准全文。来源文件和产品名称的权利归原权利人。仓库公开可读，目前尚未另行授予代码或资料的开源许可。
