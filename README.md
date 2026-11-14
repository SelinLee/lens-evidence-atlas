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

## 画质与消色差超透镜证据（v0.3.7）

[统一散点、表格与来源](https://selinlee.github.io/lens-evidence-atlas/)覆盖原有33类应用、手机、XR及超透镜文献器件。当前5款商业手机/15原生后摄配置，另2款历史手机的14条外接微距SNR研究配置及两项研究的8条原生摄像头MTF记录；8款厂商XR配置、同一研究的3款历史头显记录及Choi全息VR近眼原型。未把外接镜组的SNR写入原生主摄，也不称最新商业画质覆盖完成。

[超透镜文献矩阵](https://selinlee.github.io/lens-evidence-atlas/?domain=metalens)收录18项原始研究、67个器件/系统配置、662条记录（汇总与同器件光谱点分别记录，不计作更多实物），包括口径、设计/实测焦距、NA冲突、波段、FWHM、Strehl及重建PSNR。物理消色差、计算重建和普通色散对照分开；每格保留原始来源与位置。手机/XR/文献共78个领域字段，定义完整性和先进型号独立测量继续补证。焦距变化幅度附参考/统计协议，离散RGB不当连续消色差；效率归属差异保留，不选值排名。照明与光谱线宽分列，同一器件的二极管Strehl和超连续谱FWHM分条件保存。作者未明确定义的焦距误差与最大焦差分列；样品均值和随机单镜不合并。作者Operation偏振功率比与聚焦效率分列，±与未知n保留。新增2025片上Si3N4单镜、安装式与直接制备阵列，百分比焦距variation保留未知分母，原文波长/单位/NA冲突不取单值。Fröch2025的420个PSF波长/场角条件与轴向扫描、系统线对/反卷积分别留证，不计作更多独立实物；归属未核PSF候选不用于复算。新增Fan2019经典SiN单镜与15×15/60×60阵列系统，平均实测焦距约81.5μm和47%平均效率单列；DOF公共区不是残余焦移，逐波长焦距/FWHM仍留空。详见[Fan2019核验](docs/FAN_ARRAY_REVIEW_2026-11-14.md)、[Fröch2025核验](docs/FROCH_REVIEW_2026-11-14.md)、[Zhang2025核验](docs/ZHANG_ONCHIP_REVIEW_2026-11-14.md)、[Lin阵列MTF核查](docs/LIN_ARRAY_REVIEW_2026-11-14.md)、[Richards混合微透镜核验](docs/RICHARDS_REVIEW_2026-11-14.md)、[Li2022大口径实测核验](docs/LI_INVERSE_REVIEW_2026-11-14.md)、[Chen/Li可见光核验](docs/CHEN_LI_VISIBLE_REVIEW_2026-11-14.md)、[Chang原始MTF核查](docs/CHANG_MTF_DATA_AUDIT_2026-11-14.md)与[首批核验](docs/QUALITY_BATCH_2026-11-14.md)。

[原生手机MTF核验](docs/NATIVE_PHONE_MTF_REVIEW_2026-11-14.md)保留六手机的软件原表刻度与另两手机明示cycles/pixel的作者报告，标尺/方法缺口可查；未把未标定输出改称已校准物理频率。

[用户目录四项文献核验](docs/LOCAL_REFERENCES_REVIEW_2026-11-14.md)新增Balli、Lin、Chang及Choi：54条透镜记录与1条XR原型，逐波长效率/PSF、x/y方向、RGB离散/连续带宽及作者冲突分开。

超透镜表格按论文折叠，逐波长数据可在对应配置下展开。正文、补充材料和作者数据共用一个引用编号，每个值仍可跳到对应材料。「仅可见光」按 380–780 nm 筛选，优先使用实际测量波长，同时保留波段交叠及明确可见光用途的记录。

所有领域共用首屏散点与侧边设置，下方表格与编号来源双向跳转；支持模组、证据类型、样本/列选择、分享恢复及CSV/SVG。旧缓存升级按资源内容版本加载，未知值不补零。

## 历史范围

基础应用目录：33 类应用、90 条商业/科研/规范记录、128 个来源条目与45个指标定义（同一论文的主文和补充材料不算独立研究）。新增或复核条目分别记录实际核验日期与范围；其余旧数值保留 2026-10-25 日期，不视为全库重验。

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

打开 http://127.0.0.1:4178 ，保留完整 `dist/` 目录。统一页面使用浏览器模块，建议通过本地服务查看。外部原文链接需要联网。

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
