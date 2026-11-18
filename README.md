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

[超透镜文献矩阵](https://selinlee.github.io/lens-evidence-atlas/?domain=metalens)收录39项原始研究、229个器件/测量/系统配置、1467条记录（汇总与同器件光谱点分别记录，不计作更多实物），包括口径、设计/实测焦距、NA冲突、波段、FWHM、Strehl及重建PSNR。物理消色差、计算重建和普通色散对照分开；每格保留原始来源与位置。手机/XR/文献共112个领域字段，定义完整性和先进型号独立测量继续补证。焦距变化幅度附参考/统计协议，离散RGB不当连续消色差；效率归属差异保留，不选值排名。照明与光谱线宽分列，同一器件的二极管Strehl和超连续谱FWHM分条件保存。作者未明确定义的焦距误差与最大焦差分列；样品均值和随机单镜不合并。作者Operation偏振功率比与聚焦效率分列，±与未知n保留。新增2025片上Si3N4单镜、安装式与直接制备阵列，百分比焦距variation保留未知分母，原文波长/单位/NA冲突不取单值。Fröch2025的420个PSF波长/场角条件与轴向扫描、系统线对/反卷积分别留证，不计作更多独立实物；归属未核PSF候选不用于复算。新增Fan2019经典SiN单镜与15×15/60×60阵列系统，平均实测焦距约81.5μm和47%平均效率单列；DOF公共区不是残余焦移，逐波长焦距/FWHM仍留空。新增Khorasaninejad2017反射式AML，3个作者稿印字焦距、6个方向宽度、1.5%variation与光谱SD分别溯源；相对指定固定面的轴向焦差标为本库计算，SI受限及版本边界保留。Jeon2026新增离散RGB的实测功率表、方向焦斑与作者Strehl；TPL/NIL量测归属未知时独立留证，模拟焦圈不代替实验协议，MTF归一化曲线不估值。Pan2023新增20μm的NA0.5/0.7多层器件，400–800nm设计与六实测谱点分开；<3μm为界限，设计f按作者式由本库计算，效率区间/均值归属及模拟MTF保留边界。Khorasaninejad2015补近红外线透镜的正文直报宽度/效率与1690nm焦位，固定面焦差为本库计算；作者稿文字、未取得PDF/原图/SI的边界明确，近红外不进入仅可见光筛选。Colburn2018补经典计算成像与三LED平均效率/SSIM；Javed2026新云补充表的16个焦位独立归模拟，NA表达式和575/576实验谱点冲突保留，Chang400μm的MTF仍只有曲线。Du2025补350μm Bessel双偏振器件，40%阈值最长焦深、裸PSF与强度减法后宽度/图像SNR分别保存；MTF仍只曲线，SI受限及采样/ROI缺口保留。Ndao2020补10/15/20μm鱼网器件及640–1200nm谱点，NA口径归属与论文级约70%平均效率单列待核，光谱f/FWHM/SR/效率只曲线不估值。Hu2023新增50μm实制超宽带及色散对照，420nm实测下限与400nm声明分开；更正SI已核，1mm/NA0.98为离散RGB标量模拟，焦位/效率/SR曲线不估值。Balli 2021补20/200μm实物、13个焦斑波长和D20作者均值60%。42%的口径冲突及逐点焦距缺口保留。Yoon 2026补三种2.516mm实制镜的两物深44谱点PSF、41个波长的径向MTF曲线入口、重建斜边MTF及表S7/S15的数值。新增 Hasegawa 2026 的 1mm 离散 RGB 实物，保留激光与有限物距两组焦距、x向PSF/MTF、Strehl及以透过功率为分母的聚焦效率。新增 Bayati 2022 两口径的四只实制镜，保留轴向焦深、最小x向FWHM、轴扫效率及未确定口径的RGB MTF。新增 Bayati 2020 柱面线焦器件，列出实测与模拟焦位和焦深、最小x向宽度与效率，保留取焦条件和误差。新增 Li 2024 的 600 μm 成对 RGB 研究，保留逐色焦距、参考设计面的焦差、焦斑、聚焦效率、USAF 标靶和有限共轭模拟。Feng 2022 录入 1 mm 实物与设计 NA 0.8 的作者摘要证据。新增 Wu 2025 的宽视场实制混合镜组及SiNₓ相位校正片，录入带内焦距变化和四个斜边系统MTF数值，保留场点与模拟S/T曲线的条件。新增 Jeon 2026 的 1.2 mm 灰度纳米模板复制镜，录入三色焦斑、Strehl、聚焦功率和效率及相对设计面的焦差上界。新增 Seong 2026 的两只 5 mm 色散参照镜及逐色焦斑、Strehl 和效率。补核 Li 2021 两只 RGB 镜的分色标靶和近眼演示。新增 Aiello 2019 的 40 μm TiO₂ 偏振调焦镜，记录 483–620 nm 两设定的实测焦距范围、四谱点焦斑与 581 nm 分偏振效率。详见[Aiello 核验](docs/AIELLO_VARIFOCAL_REVIEW_2026-11-18.md)、[Seong 与 Li 核验](docs/SEONG_AND_LI_REVIEW_2026-11-18.md)、[灰度纳米模板核验](docs/JEON_GRAYSCALE_REVIEW_2026-11-18.md)、[Wu 2025核验](docs/WU_HYBRID_REVIEW_2026-11-18.md)、[Li与Feng核验](docs/RGB_APLANATIC_REVIEW_2026-11-18.md)、[Bayati 2020核验](docs/BAYATI_2020_REVIEW_2026-11-18.md)、[Bayati 2022核验](docs/BAYATI_2022_REVIEW_2026-11-18.md)、[Hasegawa 2026核验](docs/HASEGAWA_2026_REVIEW_2026-11-18.md)、[Yoon 2026核验](docs/YOON_2026_REVIEW_2026-11-18.md)、[Balli 2021核验](docs/BALLI_2021_REVIEW_2026-11-18.md)、[Hu2023核验](docs/HU_2023_REVIEW_2026-11-15.md)、[Ndao2020核验](docs/NDAO_2020_REVIEW_2026-11-15.md)、[Du2025核验](docs/DU_2025_REVIEW_2026-11-15.md)、[新云补检](docs/PMC_CLOUD_RECHECK_2026-11-15.md)、[Colburn2018核验](docs/COLBURN_2018_REVIEW_2026-11-15.md)、[Javed2026核验](docs/JAVED_2026_REVIEW_2026-11-15.md)、[Khorasaninejad2015核验](docs/KHORASANINEJAD_2015_REVIEW_2026-11-15.md)、[Pan2023核验](docs/PAN_MULTILAYER_2023_REVIEW_2026-11-15.md)、[Jeon2026核验](docs/JEON_2026_REVIEW_2026-11-14.md)、[Khorasaninejad2017核验](docs/KHORASANINEJAD_2017_REVIEW_2026-11-14.md)、[Fan2019核验](docs/FAN_ARRAY_REVIEW_2026-11-14.md)、[Fröch2025核验](docs/FROCH_REVIEW_2026-11-14.md)、[Zhang2025核验](docs/ZHANG_ONCHIP_REVIEW_2026-11-14.md)、[Lin阵列MTF核查](docs/LIN_ARRAY_REVIEW_2026-11-14.md)、[Richards混合微透镜核验](docs/RICHARDS_REVIEW_2026-11-14.md)、[Li2022大口径实测核验](docs/LI_INVERSE_REVIEW_2026-11-14.md)、[Chen/Li可见光核验](docs/CHEN_LI_VISIBLE_REVIEW_2026-11-14.md)、[Chang原始MTF核查](docs/CHANG_MTF_DATA_AUDIT_2026-11-14.md)与[首批核验](docs/QUALITY_BATCH_2026-11-14.md)。

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
