# 证据补齐任务清单

入口：[Dot 维护任务说明](DOT_MAINTENANCE.md) · [研究日志与检查点](RESEARCH_LOG.md) · [证据规则](EVIDENCE_POLICY.md)

2026-11-06用户已确认仓库与网页公开，后续发布使用[GitHub Pages](https://selinlee.github.io/lens-evidence-atlas/)；旧私有Sites记录仅为历史。

本文件是任务状态的唯一维护入口；路线图描述方向，研究日志保留过程与交接。稳定任务 ID 用于关联数据、日志、Issue 和 PR。任务拆分时使用 `EVD-002a` 等子 ID，保留父任务和拆分原因，不删除已完成历史。

## 当前执行范围 — 2026-11-18

优先核实测可见光消色差超透镜及折超混合透镜，按滚动三年中科院大类一区及经典文献例外纳入。手机和 VR/AR 数据保留。详见[维护目标](LOCAL_RESEARCH_GOAL.md)。以下新队列覆盖原全领域优先顺序；后面的旧Q0/Q1仅作历史记录，未完成项不等于已验收。旧光片002f未提交草稿保留，不继续自动执行。运行状态仍遵从会话的暂停/恢复指令。

2026-11-19 按原始光学校正证据复核既有 55 篇。正式标题和摘要用于初筛，正文图表或补件证据同样有效。最终移出 9 篇。条目中的先前发布数据为历史检查点。[逐篇复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md)

| 稳定任务 | 状态 | 范围和验收 |
| --- | --- | --- |
| FOCUS-001 两类指标词典与任务依据 | in_progress | 定义、单位、测量口径、必要条件、出处；原文排序/编辑整理/未建立明确区分；候选规格不冒充成像质量 |
| FOCUS-002 先进型号检索与逐格补证 | in_progress | 按检索截止日期覆盖跨品牌先进手机与AR/VR设备，记录纳排/地区/代际/独立实测缺口；手机逐模组、XR逐显示模式；单元格绑定定位证据 |
| DEVICE-001 已有矩阵/散点候选接续 | done | 历史候选PR #59–#63已由PR #65整合，实际发布与浏览器验收见[设备发布记录](DEVICE_RELEASE_2026-11-14.md)；后续统一模板/散点修复见UI-001/002。2026-11-14当前开放PR仅#69，不再把旧候选称为待合并 |
| FOCUS-003 参数表补全与维护 | in_progress | 两类各有型号×指标主表，支持模组/类别/条件筛选、排序、列选择、逐格来源及导出；未知值与区间可见；表和图同一数据源 |
| FOCUS-004 双指标轴散点 | in_progress | 两轴指标可选、型号多选、仅散点、重复坐标可辨、无样本间连线、缺失/区间/单位规则、分享状态及导出；核已有候选还缺哪些行为 |
| UI-001 全应用统一图表模板 | done | 2026-11-14用户追加：手机/XR与33类既有应用统一入口；首屏图表与侧边设置、下方数据表/编号来源双向跳转、兼容旧链接；本地与Chrome无头验收见[统一界面记录](UNIFIED_WORKSPACE_2026-11-14.md)，[草稿PR #70](https://github.com/SelinLee/lens-evidence-atlas/pull/70)已合并，Pages在42e1011完成实际验收；当前散点/缓存修复另见UI-002 |
| UI-002 散点图与缓存升级修复 | done | 用户报告白框并取消折线；复现旧脚本缓存混用、资源内容版本、缺值指标说明/恢复与加载失败操作；118项测试、Chrome已有缓存升级和35域交互通过，见[修复核验](SCATTER_CACHE_RECOVERY_2026-11-14.md)；[PR #71](https://github.com/SelinLee/lens-evidence-atlas/pull/71)已合并，Pages在4d3ddc0完成12文件和实际Chrome验收 |
| QUALITY-001 消色差超透镜原文参数矩阵 | in_progress | 长期首要研究任务，执行[消色差超透镜文献调研目标](LOCAL_RESEARCH_GOAL.md#持续研究范围)。持续补逐波长实测焦距、轴向/横向色差、PSF、MTF、Strehl及带协议效率，逐项绑定原始材料。当前具体论文、数量和批次状态以下方子任务及日志为准，不将已完成的专有任务固化到父目标。单批验收不关闭父目标。 |
| QUALITY-001d Chang 2024 MTF原始数据核查 | done | 本机Codex，2026-11-14；有范围的公开性核查完成，原始数值仍缺。PR #82/472cb0a、CI43585115931、Pages43585116051成功；公开12文件一致，Chrome六视口/散点读数/材料引用往返通过。仅核到曲线，数值留空，缺PSF/采样尺度/处理与场点；2026-11-20 新核 Penn State 的 US20250224542A1 及 WO2023235186A2 Figs. 46–50，图中为排版焦场及其他性能曲线，未定位 MTF 数表或可复算 PSF。见[核查记录](CHANG_MTF_DATA_AUDIT_2026-11-14.md)。 |
| QUALITY-001e Lin 2025 逐谱点焦位与焦差补证 | in_progress | 两器件十个谱点的证据边界随 PR #82 发布。2026-11-20 用本机独立无头 Chrome 取得作者预印本、其补件及期刊正式补件。期刊补件与本机文献目录副本逐字节一致。两版补件的 Fig. S5 图注与全部六张 PNG 一致，未见工作表、逐波长轴峰或可复算的 PSF 数组。DataCite 精确 DOI 关联 0 项。原刊 p.9 说明额外数据可向通讯作者请求。Fig. 2e 的焦距继续仅作模拟，Fig. 3b 与 Fig. S5a 的实测轴向图保留出处。见[本批补检](RESEARCH_LOG.md#2026-11-20-154--hasegawa-上线验收与-lin-补件比对)。 |
| QUALITY-001f Chen 2019可见光偏振不敏感器件 | done | 本机Codex，2026-11-14；PR #84/edbf81f、CI43587422204、Pages43587422182成功，149测试及线上Chrome六视口/读数/引用往返通过，公开12文件一致。三实制配置、作者约6μm/30μm带内variation、几何及参考面/效率协议完成本批纳入；逐点焦距/原始PSF仍缺，不视为这些材料已公开。见[本批核验](CHEN_LI_VISIBLE_REVIEW_2026-11-14.md)。 |
| QUALITY-001g Li 2021毫米级离散RGB器件 | done | 本机Codex，2026-11-14；PR #84同批完成Pages/线上Chrome验收。两配置五行，NA0.7三色最大焦移约1μm与x向FWHM/SR印字、NA0.3不同RGB谱点均入库；SI403及精确焦距/MTF/效率/原始PSF缺口继续保留。仅关闭本批明确范围，不关闭父目标。 |
| QUALITY-001h Li 2022厘米级RGB与原始数据 | done | 本机Codex，2026-11-14；PR #87/64b7547、CI43589333431及Pages43589333379成功，公开12文件一致，153测试及线上独立Chrome六视口/读数/引用通过。四配置/19行、3跨谱点最大差、9FWHM、6Strehl和9效率已发布；原始PSF/MTF/逐点绝对焦距仍缺。见[本批核验](LI_INVERSE_REVIEW_2026-11-14.md)。 经正式原文复核恢复。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001i Richards 2023已有混合器件补SI/谱点 | done | 本机Codex，2026-11-14；PR #89/03a215e、CI43591072657及Pages43591072682成功，公开12文件一致，160测试（含并行主线显示更新复验）和线上独立Chrome六视口/读数/引用/旧app_14与Li2022回归通过。11配置/47行、32效率与4单镜SR、作者误差汇总完成本批；逐点f/原始PSF/MTF仍缺。见[本批核验](RICHARDS_REVIEW_2026-11-14.md)。 |
| QUALITY-001j Lin 2019 GaN阵列与MTF原始数据 | done | 本机Codex，2026-11-14；PR #94/4889d26、CI43594149455及Pages43594149421成功，公开12文件一致。168测试、线上独立Chrome六视口/读数/来源/空态/框选缩放通过。新增两配置16行，Operation效率分列；MTF仅三波长曲线，原始数组/PSF/横向采样与逐点f仍缺，未复算。见[本批核查](LIN_ARRAY_REVIEW_2026-11-14.md)。 |
| QUALITY-001k Zhang 2025片上Si3N4阵列 | done | 本机Codex，2026-11-14；PR #96/d222e64、CI43596509645及Pages43596509620成功，公开12文件一致，173测试/校验/构建及线上独立Chrome六视口/两个新散点/三材料往返/实际原始链接通过。新增4配置17行、80.39%带内效率与5%作者variation；原始PSF/MTF/逐波长数表及参考分母/原文冲突仍缺，仅关闭有限批次。见[核验](ZHANG_ONCHIP_REVIEW_2026-11-14.md)。 |
| QUALITY-001l Fröch 2025厘米级可见光计算超透镜 | out_of_scope | 本机Codex，2026-11-14；PR #98/781b5d1、CI43598969231/Pages43598969229成功，公开12文件一致，179测试及线上独立Chrome读数/426角度记录/86坐标组/2材料出处往返/实际链接/六视口通过。新增439条件或曲线入口、10光学/系统配置，非更多独立实物；作者PSF候选归属/尺度仍缺，未复算或估图，仅关闭有限批次。后续照明澄清PR #100/d853beb已通过CI43599985361/Pages43599985368及12文件/Chrome复验，约50cm几何距离不当有限共轭。见[核验](FROCH_REVIEW_2026-11-14.md)。 按原始光学校正证据复查移出消色差矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001m Fan 2019经典SiN消色差阵列 | done | 本机Codex，2026-11-14；PR #102/f8d6bb2，CI43601953000/Pages43601952957成功，公开12文件一致；185测试/校验/构建及线上独立Chrome两新散点/读数投影/4配置2材料/实际原始链接/引用往返/缺值/CSV/六视口通过。新增经典研究1篇、4配置34条件或曲线入口，约81.5μm作者平均f与47%带内平均效率单列；DOF/图例/倍率冲突及逐点f/FWHM/原始PSF/MTF缺口保留，只关闭本批范围。见[核验](FAN_ARRAY_REVIEW_2026-11-14.md)。 |
| QUALITY-001n Khorasaninejad 2017可见光60nm带宽 | done | 本机Codex，2026-11-14；PR #104/455cd12，CI43605024931/Pages43605024915成功，公开12文件一致；193测试/校验/构建与线上独立Chrome三f/有符号焦差/真实零/光谱SD/宽度、3配置3材料往返、CSV及六视口通过。新增13记录，3个作者稿印字f/6个方向宽度、作者统计和本库参考面焦差分开；arXiv200/哈希一致，ACS/SI403与原始数据缺口保留，仅关闭本批范围。见[核验](KHORASANINEJAD_2017_REVIEW_2026-11-14.md)。 2026-11-23 取得 ACS 正式补件，Fig. S9 实测效率仅曲线，七个谱点已关联，数值、焦圈和功率分母留空。 |
| QUALITY-001o Jeon 2026三维RGB与近眼系统 | done | 本机Codex，2026-11-14；PR #106/61528b7，CI43608285362/Pages43608285317成功，公开12文件一致；200测试/校验/构建与线上独立Chrome三色效率/功率/宽度/SR、12行7配置3材料往返、原始链接/哈希、CSV和六视口通过。新增3x FWHM/3SR/6μW功率/3作者效率；TPL/NIL定量归属、逐λf、原始PSF/MTF及实验焦圈仍缺，S15仅f/fc曲线，只关闭本批范围。见[核验](JEON_2026_REVIEW_2026-11-14.md)。 |
| QUALITY-001p Pan 2023三维多层高NA消色差 | done | 2026-11-20 取得 PMC 开放存档的正式 PDF 与 SI。核 Fig.3C 轴向峰位、Fig.4A/B 与两项 S7 模拟 MTF，新增 S9B 四条成像记录。26 条、7 个配置。PR #198 和 Pages 44717638073 已上线，321 项测试通过，235 个线上文件逐一一致。独立无头 Chrome 核表格、散点及原图往返。蓝光标签有分歧，逐波长焦位、FWHM、效率及 PSF／MTF 原数组留待查证。见[原件核验](FENG_PAN_ORIGINAL_EVIDENCE_2026-11-20.md#pan-2023-三维打印多层超透镜)。 |
| QUALITY-001q 2015奠基实测透镜与模拟筛选 | done | 本机Codex，2026-11-15；PR #110/43ad73e，CI43661959192/Pages43661959154成功，公开12文件一致；212测试/校验/构建与线上独立Chrome三宽度/三效率/1690nm焦位/本库负焦差、1配置10行3材料往返/CSV/近红外筛选及六视口通过。仅作者稿正文直报，ACS/作者PDF403、DASH元数据200/content401，原图/SI/原始数组与精确峰位/协议仍缺；只关闭本批文字范围，见[核验](KHORASANINEJAD_2015_REVIEW_2026-11-15.md)。 |
| QUALITY-001r Avayu 2017可见光三层RGB | done | 本机Codex，2026-11-15；PR #112/5799a13，CI43663618827/Pages43663618824成功，公开12文件一致；219测试/校验/构建及线上独立Chrome两宽度/冲突排除、17行7配置2材料同篇往返、CSV/分享/可见光筛选/六视口和原始链接200/哈希一致。红光2.6/2.3μm未消歧，逐λf/效率及原始PSF/MTF仍缺，只关闭有限批次，见[核验](AVAYU_2017_REVIEW_2026-11-15.md)。 |
| QUALITY-001s Javed 2026双模式/轴向容差 | done | 本机Codex，2026-11-15；PR #114/0ad31f2，CI43665551627/Pages43665551631成功，公开12文件一致；227测试/校验/构建及线上独立Chrome633nm/19%读数、模型重合、31行6配置4材料往返、CSV/分享/缺值/可见光/六视口通过。等待DOM后正式Fig2–6视觉核/CDN200，PDF/SI403；逐λf/宽度/效率表、原始PSF/MTF及575/576差异仍缺，只关有限批次。见[核验](JAVED_2026_REVIEW_2026-11-15.md)。 |
| QUALITY-001t Colburn 2018经典计算消色差/MTF | out_of_scope | 本机Codex，2026-11-15；PR #116/b1217dc，CI43667898844/Pages43667898780成功，公开12文件一致；234测试/校验/构建及线上独立Chrome平均效率/SSIM四读数、26行12配置5材料引用往返/CSV/分享/缺值/可见光/六视口通过。正式SI新云200/哈希核；原始PSF/数值MTF及逐λf/效率/CI与采样仍缺，只关有限批次。见[核验](COLBURN_2018_REVIEW_2026-11-15.md)。 按原始光学校正证据复查移出消色差矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001u 新云资料补检/MTF原始证据 | done | 本机Codex，2026-11-15；PR #118/ed46140，CI43669708837/Pages43669708773成功、12公开文件一致；241测试/校验/构建与线上独立无头Chrome16模拟点/读数/来源往返/CSV/分享/六视口通过。Chang新云同字节PDF仍只有曲线；Javed补16模型焦位/NA公式及全孔575/576冲突，实测f不增加；只关有限批次，见[核验](PMC_CLOUD_RECHECK_2026-11-15.md)。 |
| QUALITY-001v Du 2025可见光准消色差双功能 | done | 本机Codex，2026-11-15；PR #120/c46944a，CI43671836597/Pages43671836604成功、12公开文件一致；250测试/校验/构建与线上独立无头Chrome四类指标/来源往返/CSV/分享/六视口通过。新增350μm实物的32条件记录：3最长焦深、3原宽/3减法后宽与15作者图像SNR分性质；MTF仅曲线，SI/原始数组/f/效率/ROI等仍缺，只关有限批次，见[核验](DU_2025_REVIEW_2026-11-15.md)。 |
| QUALITY-001w Ndao 2020经典fishnet宽带原作 | done | 本机Codex，2026-11-15；PR #122/c939fda，CI43674536092/Pages43674536101成功、12公开文件一致；259测试/校验/构建与线上独立无头Chrome两口径/NA坐标、未分派NA/研究级均值、出处往返/CSV/分享/实际可见光/六视口通过。三实制口径及30条件/汇总记录，图3/S8归属、基底说明、逐λ原表/PSF/MTF等仍缺，不估曲线，只关有限批次；见[核验](NDAO_2020_REVIEW_2026-11-15.md)。 |
| QUALITY-001x Hu 2023渐近色散超宽带原作 | done | 0.3.21 已随 PR #124/861d325 发布。267 项测试、Pages 43676956543、12 文件一致及无头 Chrome 六视口/出处与散点通过。原始数据缺口保留，见[核验](HU_2023_REVIEW_2026-11-15.md)。 |
| QUALITY-001y Balli 2021 纳米孔超宽带实物与中继成像 | done | 0.3.22 经 PR #125/fc38fef、Pages 44259437894 上线，268 测试、12 文件一致与线上无头 Chrome 六视口通过。原图、逐λ数表及42%口径归属仍待补证，见[核验](BALLI_2021_REVIEW_2026-11-18.md)。 |
| QUALITY-001z Yoon 2026 两物深PSF和光学/系统MTF | out_of_scope | 0.3.23 经 PR #127/a7ce01e、Pages 44267510878 上线。271 个测试、12 文件一致、无头 Chrome 的306条记录、9个配置、6种视口及7个出处验证通过。原始PSF及逐频数表仍待补，见[核验](YOON_2026_REVIEW_2026-11-18.md)。 按原始光学校正证据复查移出消色差矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001aa Hasegawa 2026 毫米级单层离散RGB实测 | done | 0.3.24 经 PR #128/c8788b4、Pages 44272450188 上线。273 个测试、12 文件一致、无头 Chrome 的15条记录、6个焦差坐标、两类功率比、可见光筛选及引用往返通过。SI、原始数表和PSF待补，见[核验](HASEGAWA_2026_REVIEW_2026-11-18.md)。 |
| QUALITY-001ab Bayati 2022 二维逆设计的可见光对照 | out_of_scope | 0.3.25 经 PR #130/ec77ad8、Pages 44277936294 上线。275 个测试、12 文件一致、无头 Chrome 复核44行、12配置、10个读数、7个出处及六视口。原始数组与曲线归属仍待补，见[核验](BAYATI_2022_REVIEW_2026-11-18.md)。 按原始光学校正证据复查移出消色差矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001ac Bayati 2020 柱面线焦逆设计 | out_of_scope | 0.3.26 经 PR #132/3a88d7f、Pages 44282456672 上线。277 个测试、12 文件一致、无头 Chrome 核25行、15配置、重合点往返和六视口。原始PSF及MTF待补，见[核验](BAYATI_2020_REVIEW_2026-11-18.md)。 按原始光学校正证据复查移出消色差矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001ad Feng 2022 高NA RGB双层实制镜 | in_progress | 沿 Hasegawa 2026 Table 1 的参考文献46。已核 D1 mm 实物、设计 NA0.8、方形与圆形纳米柱及课题组三色成像图。Crossref 组件 .s003 对应 nl2c00486_si_003.pdf，.s001 为影片。出版社正文与补件 HTTP 403。2026-11-22 重查 Crossref 101 次、OpenAlex 102 次。圣保罗大学与 FAPESP 项目条目回指正式 DOI。继续查作者存档，补主镜的设计焦距、逐色原值与测量协议，并核厘米级与 TiO₂ 配置。见[原件核验](FENG_PAN_ORIGINAL_EVIDENCE_2026-11-20.md#feng-2022-双层-rgb-超透镜)。 2026-11-23 按 DOI 核 ACS Figshare 条目 19705298 v1、文件 34997879、13 页、已登记 MD5。下载入口未取得 PDF 字节。 |
| QUALITY-001ae Zhang 2025 RGB高分辨率与重建 | in_progress | PR #176/bc72d96 与 Pages 44454854146 已上线，独立无头 Chrome 核 410 μm 及引用往返。0.775 μm 留在作者报告说明。期刊目录描述神经网络进一步增强，处理阶段、判据和逐色最佳焦位仍待正文。2025 年 3 月中科院升级版物理与天体物理大类一区。PDF、ePDF 与补件直连 403，继续找可读作者材料。[本批核验](ZHANG_RGB_IMAGING_REVIEW_2026-11-19.md) |
| QUALITY-001af Li 2024 校正球差的高NA离散RGB | done | 0.3.27 经 PR #134/c7b54f1、Pages 44293871331 上线。280项测试、12文件一致，独立无头Chrome通过40行、13配置、三处实测焦位及两篇材料往返。逐频MTF、原始PSF、未标逐色焦位和场点待补。见[本批核验](RGB_APLANATIC_REVIEW_2026-11-18.md)。 |
| QUALITY-001ag Park 2026 可见光双层混合消色差 | in_progress | 2026年9月Nano Letters，DOI 10.1021/acs.nanolett.6c02688。作者摘要核实双层超表面与折射元件混合成像，SI目录列超透镜MTF及混合镜焦斑。两份期刊PDF及Figshare公开搜索返回403。OpenAlex只列DOI及PubMed；2022同组合作者报告的样机与2026装配配置尚未对齐。公开分区条目记 2025 年升级版材料科学大类二区，暂缓常规收录，保留待复查线索。[公开分区条目](https://www.ais.cn/journal/database/6024) |
| QUALITY-001ah Wu 2025 宽带混合镜组实测焦差与斜边MTF | done | 0.3.28 经 PR #136/cc281ba、Pages 44297858075 上线，283项测试、12文件一致，独立Chrome核18行8配置、五个主散点和四材料。逐波长焦位、逐频原表和原始边缘图仍待补。见[本批核验](WU_HYBRID_REVIEW_2026-11-18.md)。 |
| QUALITY-001ai Jeon 2026 灰度纳米模板与OLED近眼 | done | 0.3.29 经 PR #138/dacc200、Pages 44302719186 上线。287项测试、12文件一致，独立Chrome核30行12配置和五个出处。原始PSF/MTF、焦位及归一化细则仍待补。见[核验](JEON_GRAYSCALE_REVIEW_2026-11-18.md)。 |
| QUALITY-001aj Seong 2026 UV/可见光分组的实制色散对照 | out_of_scope | 0.3.30 经 PR #140/8fae312、Pages 44307956209 上线。14行8配置，保留四谱点焦斑、Strehl、实验效率及作者有效焦距。原始PSF、逐频数表和标定待补。见[核验](SEONG_AND_LI_REVIEW_2026-11-18.md)。 按原始光学校正证据复查移出消色差矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001ak Li 2021 毫米级RGB原文补检 | done | 0.3.30 经 PR #140/8fae312 上线。补12行6配置，正式PDF、两只镜的标靶与VR/AR已核。S3/S5/S14、逐点焦位及原始PSF/MTF留待后续。见[核验](SEONG_AND_LI_REVIEW_2026-11-18.md)。 |
| QUALITY-001al Aiello 2019 可见光偏振调焦与轴向消色差 | done | 0.3.31 经 PR #142/866663f 与 Pages 44312264113 上线。25条8配置，293项测试与线上独立 Chrome 通过。四谱点宽度、单谱点偏振效率和两组拟合焦距范围已录，范围宽度约66、13 μm 标本库计算。逐点焦位、原始 PSF/MTF、焦圈和 ACS 正式补件待补。[核验](AIELLO_VARIFOCAL_REVIEW_2026-11-18.md) 2026-11-23 取得 ACS 正式补件。Fig. S2 ±2 个百分点为重复测量标准差，n 缺失；§SIV E Eq. (S20) 补 581 nm 焦区/口径入射功率协议。 |
| QUALITY-001am Li 2026 随机马赛克近红外消色差 | done | 0.3.32 经 PR #144/fe587e5 与 Pages 44317215389 上线，19 条、4 配置、296 项测试及线上 Chrome 验收通过。已录 11 谱点 FWHM、Strehl、旁瓣比，3 个对照焦位与 800 μm 两通道效率证据。53 点横向剖面定位 Fig.4f，逐波长焦位、主镜效率及二维 PSF/MTF 待补。[核验](LI_MOSAIC_REVIEW_2026-11-18.md) |
| QUALITY-001an Zhang 2025 折叠光路反射式消色差 | done | 0.3.33 经 PR #146/e02d192 及 Pages 44322388309 上线，新增 16 条、2 配置。298 项测试、12 文件一致，独立 Chrome 核验通过。Fig.3g–i 的七个 LCP 谱点按实验记录，SI Fig.S7 按模拟记录。逐点焦位、焦斑宽度和效率原表、主镜口径及 NA 待补。[核验](ZHANG_FOLDED_REVIEW_2026-11-18.md) |
| QUALITY-001ao Wang 2021 红光至近红外补证 | done | 0.3.34 经 PR #148/0bcdbd0 与 Pages 44326909172 上线。300 项测试，12 文件一致。独立 Chrome 核 23 条、6 配置、三个实验和两个模拟效率散点、8 处来源。低 NA 的 700 nm 图文冲突保留，焦位原值、PSF 数据及 MTF 仍缺。[本批核验](WANG_BROADBAND_REVIEW_2026-11-18.md) |
| QUALITY-001ap Colburn 与 Majumdar 可见光变焦补证 | out_of_scope | 0.3.35 经 PR #150/c8b3532 与 Pages 44335431223 上线。302 项测试、12 文件一致，独立 Chrome 核 32 条、9 配置、三处量化散点和来源往返。论文 Fig.4 的轴向色移保留图位，博士论文 Fig.5.9 补 MTF 曲线，原始数组仍缺。[本批核验](COLBURN_QUARTIC_REVIEW_2026-11-18.md)  主文 Fig. 4 报告显著轴向色移，全彩变焦依赖焦深容差与去卷积，移出矩阵。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001aq Arbabi 2018 双波长显微物镜 | done | 0.3.36 经 PR #152/3596147 与 Pages 44340061284 上线。304 项测试、12 文件一致。独立 Chrome 核 10 条、5 配置、七个量化散点、出处往返。600/822 nm 两轴向峰差 4 μm 标本库计算，原始 PSF、标定及 MTF 仍缺。[本批核验](ARBABI_DUAL_REVIEW_2026-11-18.md) |
| QUALITY-001ar Wang 2017 近红外反射式经典消色差 | done | 0.3.37 经 PR #154/bf4f0c4 与 Pages 44345325752 上线。306 项测试，线上 12 文件一致。独立 Chrome 核 24 条、13 配置、三个金属镜归一峰值、六视口和引用往返。三只实物消色差镜与三只色散对照各自标记，逐波长焦位、PSF 与 MTF 原表待补。[本批核验](WANG_REFLECTIVE_REVIEW_2026-11-19.md) |
| QUALITY-001as Zhang 2025 可见光折超混合实物与模型 | done | 0.3.38 经 PR #156/797fca6 与 Pages 44350394909 上线。308 项测试、12 文件一致，独立无头 Chrome 核 70 条、4 配置、54 个模型散点、引用往返和两份作者原始文件。已录混合镜与非球面实拍谱点、实验图注及复算。焦位原值、83% 定义及原始 PSF/MTF 待补。[本批核验](ZHANG_VISIBLE_HYBRID_REVIEW_2026-11-19.md) |
| QUALITY-001at Arbabi 2017 反射镜色散符号与消色差带宽 | done | 0.3.39 经 PR #158/cae5f5e 与 Pages 44356328355 上线。310 项测试，线上 12 文件一致。独立无头 Chrome 核 123 条、18 组、两口径散点、30 组波长散点和来源往返。七只实物各 15 谱点，500 μm 的固定面、二维 MTF 积分 Strehl、相对常规镜 1520 nm 的 50%–60% 独立保留。逐点焦位和原始数组仍缺。[本批核验](ARBABI_DISPERSION_REVIEW_2026-11-19.md) |
| QUALITY-001au Arbabi 2016 双波长超分子透射镜 | done | 0.3.40 经 PR #160/c6d96ce 和 Pages 44360980765 上线，312 项测试、12 个公开文件一致。独立无头 Chrome 核 12 条、5 配置、有限共轭像距、相对设计面 −20 μm、四项效率及引用往返。两只 300 μm 的实物仅有 915／1550 nm 离散校正证据，两色成对峰位及原始 PSF/MTF 待补。[本批核验](ARBABI_METAMOLECULE_REVIEW_2026-11-19.md) 经正式原文复核恢复。[复核](ACHROMATIC_ELIGIBILITY_AUDIT_2026-11-19.md) |
| QUALITY-001av Sawant 2021 厘米级折超混合色差校正 | done | 0.3.41 经 PR #162/9a79c02 与 Pages 44365200382 上线。314 项测试和 12 文件校验通过。独立无头 Chrome 核 3 配置、33 条、24 个几何标记、650 nm 的 LSAM 效率、可见光筛选和来源往返。LCAM 与裸镜各 11 个谱点，600／800 nm 端点抑制有原文，绝对焦位及原始 PSF/MTF 待补。补件 5436264.pdf 的 Figshare 入口返回 403。[本批核验](SAWANT_HYBRID_REVIEW_2026-11-19.md) |
| QUALITY-001aw Wang 2026 可见光贝塞尔超表面阵列 | done | 0.3.42 经 PR #164/263a6e5 和 Pages 44368699026 上线。316 项测试、12 个公开文件一致。线上无头 Chrome 核 6 配置、40 条、三项 RGB 宽度、三项重建角分辨率和 7 项来源。各场点方向、K1/K2 角度冲突及设计横移保留，原始 PSF、逐通道偏移和 MTF 待补。[本批核验](WANG_METAAXICON_REVIEW_2026-11-19.md) |
| QUALITY-001ax Zang 2024 长波红外折超混合镜 | in_progress | ACS Nano，2024-11-26，2025 年中科院升级版材料科学大类一区。作者摘要报告 8–14 μm 折超混合热像系统、30° 视场和 13.6 mm 光程。补件索引列 Fig. S8 倾斜入射 MTF、S14 单色实验、S16 滤片标靶。Crossref 确认补件组件 DOI 10.1021/acsnano.4c12546.s001 对应 nn4c12546_si_001.pdf。独立无头 Chrome 访问正式正文及补件返回 403，DR-NTU 正文库题名检索零项，DataCite 精确关联零项，Figshare 检索入口返回 403。仍需核 Fig. S14、S16 的实测谱点、固定像面和色差校正对照。[原作](https://doi.org/10.1021/acsnano.4c12546) · [2025 分区](https://www.goingpub.com/journal_detail/acs-nano.html) |
| QUALITY-001ay Huang 2024 长波红外宽带热成像作者数据 | todo | 暂列宽带色差缓解候选。主文 Figs. 3–4 给固定像面窄带成像和去卷积热像，作者公开的 8.5、9、9.5、10、10.5 μm PSF 可用于复算该面 MTF。逐波长最佳焦位、z 标签的焦面参考与轴向焦移仍待补。PSF 和 MTF 的核查留在本地草稿。[正式版](https://labs.ece.uw.edu/amlab/Papers_Journals/Broadband_Thermal_Imaging.pdf) · [作者数据](https://zenodo.org/records/10400870) |
| QUALITY-001az Li 2021 带通滤片集成可见光 RGB 超透镜 | done | 0.3.43 经 PR #166/5a3b9d9 与 Pages 44374888724 上线。317 项测试及公开 12 文件校验通过。独立无头 Chrome 核 8 条、2 配置、三色焦斑／效率散点及出处往返。已收三个离散谱点的固定面焦斑和轴扫；精确焦位、原始 PSF／MTF 及实验效率口径待补。[本批核验](LI_BANDPASS_REVIEW_2026-11-19.md) |
| QUALITY-001ba Chen 2018 可见光折超混合色差校正 | done | 0.3.44 经 PR #168/f0d73e0 与 Pages 44449203787 上线。319 项测试与 12 个公开文件核对通过。独立无头 Chrome 核 43 条、7 配置、约 35% 散点及引用往返。两份作者 PDF 复核，三种谱点条件、实测焦移数量级与两套效率定义已录。原始峰位、逐点 FWHM／Strehl 数表、PSF 和 MTF 待补。[核验](CHEN_METACORRECTOR_REVIEW_2026-11-19.md) |
| QUALITY-001bb Eisenbach 2015 可见光双波长振幅型超表面波带片 | done | 0.3.45 经 PR #170/0352c12 及 Pages 44450868969 上线，320 项测试、12 个公开文件校验通过。无头 Chrome 核 12 条、4 配置、两主焦及蓝光副焦散点、引用往返和六视口。原始峰位误差、主器件口径／NA、原始 PSF／MTF、效率及串扰原值待补。[本批核验](EISENBACH_DUAL_FZP_REVIEW_2026-11-19.md) |
| QUALITY-001bc Zhao 2015 金膜孔阵列离散谱点消色差设计 | done | 0.3.46 经 PR #173/97135ef 及 Pages 44452570837 上线，322 项测试、12 个公开文件校验通过。无头 Chrome 核 18 条、6 配置、三个模拟焦点、可见光筛选、七个出处及引用往返。20 μm 三谱点实物的 9 μm 为固定评价面。独立的 STED 样品保留焦斑形状证据。逐色最佳焦位、残余轴向焦差、原始 PSF/MTF 及效率待补。[本批核验](ZHAO_GEOMETRIC_PHASE_REVIEW_2026-11-19.md) |
| QUALITY-001bd Arbabi 2016 偏振选择性双波长校正 | done | Optics Express，2016-08-03 正式上线。2026-11-19 查 Crossref 100 次。五只 200 μm 实物，780 nm 与 915 nm 分别对应 y 与 x 线偏振。已定位 Fig. 5 的轴上焦斑、照到器件的总入射功率分母及五只针孔的尺寸。已录五只名义配置与 Fig. 6 对照的十个错配偏振实测焦位，匹配残余数值、效率数表和原始像素待补。PR #185 与 Pages 44463849963 已上线，308 项测试和无头 Chrome 实页通过。[校方正式版](https://authors.library.caltech.edu/records/zsmjf-ng522) · [Crossref](https://api.crossref.org/works/10.1364/OE.24.018468) |
| QUALITY-001be Cao 2024 石墨烯多谱点可见光与通信波段 | in_progress | 两只实物的离散谱点和 Fig. 2／4 轴向及横向强度图注已核，另录 Fig. 2 模拟和 Fig. 5 三色实拍／合成。摘要的偏差小于 0.15% 按论文层级原述保留。补件、逐波长精确焦位、口径／NA、原始 PSF 和效率协议继续待补。PR #183 和 Pages 44461963726 已上线，306 项测试及独立无头 Chrome 验收通过。[本批核验](CAO_GRAPHENE_REVIEW_2026-11-19.md) |
| QUALITY-001bf Rong 2026 一步纳米压印可见光器件 | todo | 原文 Fig. 4 和 Table S8 有五谱点轴扫与重复焦距，主文报告焦距光谱 SD 1.14 μm。期刊 2025 年 3 月中科院大类一区未核实，LetPub 存档明确标 2025 年未收录，另一聚合条目版本展示不清，先保留候选。[正式原文](https://www.light-am.com/article/doi/10.37188/lam.2026.105) · [分区存档](https://www.letpub.com.cn/index.php?journalid=43508&page=journalapp&view=detail) |
| QUALITY-001bg Ren 2022 三维打印光纤端面消色差 | done | 核正式主文、SI Tables 3–6、公开审稿及更正。五谱点的实测焦斑、玻璃两只实物的三种效率和消色差镜直报焦位已录。保留 Fig. 3E／3F 与正文焦位方向冲突。逐点残余、原始 PSF 与 MTF 待补。PR #181/Pages 44460309895 上线。304 项测试、230 个公开文件及无头 Chrome 实页通过。[本批核验](REN_METAFIBER_REVIEW_2026-11-19.md) 2026-11-23 核共同一作 LMU 学位论文 p.65 正文，录入未校正玻璃样片 1250／1650 nm 的 306／225 μm，计算两端互差 81 μm，保留 Fig. 3E 冲突。Fig. 4.13 补玻璃校正样片的 10×、NA 0.2 接收物镜，p.66 补光纤支架侧壁厚度 10 μm。[学位论文](https://edoc.ub.uni-muenchen.de/34173/1/Li_Chenhao.pdf#page=79) 0.3.86 经 [PR #251](https://github.com/SelinLee/lens-evidence-atlas/pull/251) 和 [Pages 45047605030](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/45047605030) 发布，370 项测试、260 个发布文件及独立无头 Chrome 验收通过。 |
| QUALITY-001bh Tang 2026 纳米打印多焦点离散消色差 | in_progress | ACS Photonics，2026-04-15 正式上线，2025 年 3 月升级版物理与天体物理大类一区。原刊摘要有两个可见光实制原型及小于 1 μm 的轴向色差，逐样品谱点、焦位定义和 MTF/效率协议待核。两只原型分开入库。650 nm 为结构周期。已核补件组件 DOI 10.1021/acsphotonics.6c00399.s001 及 PDF ph6c00399_si_001.pdf，期刊直连 403。摘要 <1 μm 留论文层级等待归属。逐色谱点与性能缺口开放，PR #185 与 Pages 44463849963 已上线，线上核实补件登记和来源往返。2026-11-20 复核 Crossref 补件组件有条目，独立无头 Chrome 打开组件 DOI、补件直链和 Figshare 按 DOI 查询均返回 403，DataCite 组件查找返回 404。公开摘要的补件目录列 MTF、场图和效率。继续核作者存档。[组件 DOI](https://api.crossref.org/works/10.1021/acsphotonics.6c00399.s001) · [期刊摘要与补件清单](https://pubs.acs.org/doi/abs/10.1021/acsphotonics.6c00399) · [武汉大学图书馆分区](https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=13654) · [2025 年分区存档](https://www.sfabiao.com/sci/23304022/) 2026-11-23 按 DOI 核 ACS Figshare 条目 32029879 v1、文件 63774052、17 页、已登记 MD5。下载入口未取得 PDF 字节。 |
| QUALITY-001bi Hsu 2022 偏振复用双波长实验 | in_progress | Crossref 64 次、OpenAlex 75 次（2026-11-19）。录入两通道 Airy 拟合 NA、固定针孔面，及同文未校正单镜的 +300 μm、56%／58% 和接收端补偿。正式版与学位论文的效率 42%／45% 与低于 20% 并存，复用效率与 850／852 nm 冲突字段留空。PR #187 与 Pages 44466658830 已上线。310 项测试、234 个公开文件校验及独立无头 Chrome 验收通过，逐色焦位和原始数据待补。复核上线分组，准入依据为附录 Fig. 6 的独立样片。主文光镊是同文色散对照，矩形柱样片未用于本研究的原子捕获。 [本批核验](HSU_POLARIZED_FOCUS_REVIEW_2026-11-19.md) |
| QUALITY-001bj Balli 2020 100 μm 空气间隔 HAML | in_progress | Crossref 221 次（2026-11-19）。主文、补充材料 PDF p. 5 Fig. S4a–c 和同版 Source Data 已取到。补件证实 EPD 100 μm、名义 NA 0.24、间隔 7 μm 的独立实物。三个工作表覆盖 1000–1800 nm 每 100 nm 实测焦斑宽度、聚焦效率和归一化焦距误差。九谱点和一条汇总已录，另补四只已存器件的 36 个有符号焦距误差。19% 为作者均值，九格等权平均约 18.25%；逐色绝对焦位及原始 PSF/MTF 仍缺。PR #189 与 Pages 44469078194 已上线，313 项测试、234 个线上文件比对及独立无头 Chrome 验收通过。[本批核验](BALLI_2020_AIR_SPACED_REVIEW_2026-11-19.md) · [补件 p. 5](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM1_ESM.pdf#page=5) · [Source Data](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-020-17646-y/MediaObjects/41467_2020_17646_MOESM3_ESM.xlsx) 2026-11-23 补同文五配置的源表百分数极差、四条主文汇总及 20 μm 补件九色实验的 FWHM、效率和有符号焦距误差。34.5 μm 作为 Fig. 4a 报告的焦面距离保存。逐色绝对焦位、横向采样与 MTF 待补。 0.3.84 经 [PR #247](https://github.com/SelinLee/lens-evidence-atlas/pull/247) 与 [Pages 45043533789](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/45043533789) 上线。369 项测试、260 个发布文件及独立无头 Chrome 验收通过。 |
| QUALITY-001bk Shrestha 2018 四只宽带介质超透镜补证 | in_progress | Balli 2020 参考文献 15。Crossref 718 次、OpenAlex 849 次（2026-11-19）。已取正式主文和 DOCX，Table S1 给 M1A/M1B/M2/M3 四只实物的设计焦距与几何，M2、M3 的 NA 与 Fig. 4 图注略异。视觉核 Fig. 5a–f。2%–5% 是四样品的作者概述，逐波长精确焦位、FWHM、效率和 Strehl 数表仍待找。已录四只实物的 33 个实测波长及 1 μm 典型轴扫步长，Fig. 5d–f 的测量状态与缺口明确。M1A 的 1660 nm 实测位于设计上限 1650 nm 之外。PR #191 与 Pages 44470952455 已上线，314 项测试、234 个公开文件和独立无头 Chrome 验收通过。[本批核验](SHRESTHA_2018_FABRICATED_REVIEW_2026-11-19.md) · [正式主文](https://www.nature.com/articles/s41377-018-0078-x.pdf) · [补件 Table S1](https://static-content.springer.com/esm/art%3A10.1038%2Fs41377-018-0078-x/MediaObjects/41377_2018_78_MOESM1_ESM.docx) |
| QUALITY-001bl Hasegawa 2026 毫米级 RGB 器件补件与原始数据 | in_progress | 2025 年 3 月中科院物理与天体物理大类一区。原刊 p.14 给补件名 lpor72174-sup-0001-SuppMat.pdf，§2.4 指向 Fig. S1/Table S2 的失谐评估与 Fig. S2/Table S3 的偏振评估。出版社的补件直连与文件入口在本机无头 Chrome 返回 403。已补 30 μm RGB 汇总及偏振评估，和 1 mm 柱面模型优化前后的六个谱点。实物理论焦斑宽度已在三处补来源。2%／6%／5% 仍待补件确认归属与证据性质。PR #193 与 Pages 44473195305 已上线，315 项测试、234 个线上文件及独立无头 Chrome 验收通过。[模型核验](HASEGAWA_2026_MODEL_EVIDENCE_2026-11-19.md) · [本批已有核验](HASEGAWA_2026_REVIEW_2026-11-18.md) · [期刊正式稿](https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/lpor.72174) · [武汉大学图书馆分区](https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=13647)。2026-11-20 取得东京农工大发布说明，确认有复用实测焦斑图和三色条件。DataCite 精确 DOI 关联为 0，相关原始补件和数据仍待核。同日复核原文，将 500 mm 物距下 RGB 轴峰从实测焦距迁至有限共轭实测像距，按两个光路各自三条实测位置加 90／30 μm 跨波长跨度汇总。ARIM 项目号搜索未定位公开数据，详细检索无法返回结果。[东京农工大说明](https://www.tuat.ac.jp/documents/tuat/outline/disclosure/pressrelease/2026/20261111_01.pdf) 0.3.66 经 [PR #212](https://github.com/SelinLee/lens-evidence-atlas/pull/212) 上线，338 项测试、241 个发布文件及六视口独立无头 Chrome 验收通过。 2026-11-25 由同一谱点两个作者实测功率比换算 450／532／633 nm 的入射功率参照效率约 4.4%／20.8%／18.9%，理论参考宽度 2.25／2.64／3.05 μm 分列，补 Fig. 6c 作者总视场 9.8°。补件直连仍 403。两个 ARIM 编号原印字继续跟踪。 0.3.88 经 [PR #255](https://github.com/SelinLee/lens-evidence-atlas/pull/255) 与 [Pages 45577495146](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/45577495146) 发布，371 项测试、262 个公开文件和独立无头 Chrome 验收通过。 |
| QUALITY-001bm Baek 2022 高 NA 离散 RGB 实物 | in_progress | 2026-11-19 查 Crossref 64 次、OpenAlex 69 次，核十页正式 PDF。450 μm／NA 0.87 实物的三个光学谱点与蓝光偏振均值已录，20 μm FDTD 的三色效率单列。Fig. 3d 证实近共同标称面，逐色峰位、残差和原始 PSF／MTF 仍缺。B37 指向合理请求。PR #194 与 Pages 44474976713 已上线，318 项测试、235 个发布文件和独立无头 Chrome 验收通过。[核验](BAEK_2022_RGB_REVIEW_2026-11-19.md) |
| QUALITY-001bn Kang 2026 紫外到可见光实物的残余焦差与像质 | in_progress | 正式上线 2026-05-18，2025 年 3 月中科院材料科学大类一区。复核正式稿 §§2.3–2.4、§4.8 和补件目录。接续核 SiNₓ 与 ZrO₂ PER 实物的逐谱点实测焦距、固定设计焦距参照、对照镜归属和作者效率协议。15 个实测焦位已按各自设计面算有符号偏差和两组峰峰值，模拟 FWHM 与 SiNₓ 未校正对照已录。 PR #196 与 Pages 44714451058 已发布，321 项测试、235 个发布文件及独立无头 Chrome 验收通过。Table S1、Fig. S10、S17 与 Note S19 待补件。[本批核验](KANG_2026_RESIDUAL_FOCUS_REVIEW_2026-11-20.md) Wiley 主文、补件、Fig. 4／5 导出及 ResearchGate 图像直连在本机无头 Chrome 返回 403，正式稿索引正文可读。[正式稿](https://advanced.onlinelibrary.wiley.com/doi/epdf/10.1002/adfm.75854) · [武汉大学图书馆分区](https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=13450) · [2025 年分区](https://www.fabiao.com.cn/sci/1616301x/) |
| QUALITY-001bo Fan 2024 eLight 纳米压印近眼阵列 | out_of_scope | 2024-01-22 正式上线，2025 年 3 月中科院物理与天体物理大类一区。已取得主文和官方 ZIP，视觉核补件 p.8 Fig. S5a–c。单透镜在 463／547／617 nm 的测量峰位印为 6934／5859／5198 μm，谱点峰峰差 1736 μm。补件 §S5 将普通阵列色散及可行消色差设计分别讨论。该阵列记录保留供近眼系统后续维护。[原作](https://link.springer.com/article/10.1186/s43593-023-00055-1) · [补件](https://static-content.springer.com/esm/art%3A10.1186%2Fs43593-023-00055-1/MediaObjects/43593_2023_55_MOESM1_ESM.zip) |
| QUALITY-001bp Chen 2024 双波长消色差单原子光镊 | in_progress | 已通过中科大作者主页取得Wiley正式PDF，录入2 mm圆形实物、设计NA 0.46、两波长焦斑和780 nm距芯片表面约2.6 mm的实测焦位。记录作者两路共同约22%效率及5 μm光阑。852 nm独立轴向焦位、残余焦差、逐色FWHM、效率分母和二维PSF/MTF待核。正式版pp.3–4指向补件中的效率光路和实测YZ分布，Wiley补件403。arXiv源包只含制图与文本等上传材料。0.3.60 经 PR #200 和 Pages 44720277496 发布，324 项测试、236 个发布文件和独立无头 Chrome 验收通过。[本批核验](CHEN_ATOM_TWEEZER_REVIEW_2026-11-20.md) |
| QUALITY-001bq Dou 2020 离轴三色反射消色差设计 | out_of_scope | 2026-11-20 查 Crossref 106 次、OpenAlex 108 次。主文 Fig.4 的三色轴向峰位、FWHM 与焦区效率来自模拟，Fig.5 为模拟图像，补件 Fig.S3 为 TM 数值结果。已查材料未核实制器件或实测焦位，留在检索记录。[正式正文](https://www.researching.cn/ArticlePdf/m00091/2020/3/4/04190005.pdf) · [Crossref](https://api.crossref.org/works/10.29026/oea.2020.190005) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.29026/oea.2020.190005) |
| QUALITY-001br Zang 与 Xia 2026 可见双色激发／荧光消色差 | in_progress | 2026-03-01上线，2025年3月中科院材料科学大类一区。已录两只1 mm镜及单镜成像系统共7条。正式§2.2以700 nm设计焦位242 μm作Δz=0，作者给相对商用NA0.70物镜的荧光收集量约16%／34%，谱宽约30／50 nm。Fig.4系统实测X／Z宽度为405 nm／1.8 μm。补件403，逐色焦位、残余色差、效率积分端点和原始PSF待核。0.3.61 经 PR #202 与 Pages 44722618852 发布，327 项测试、237 个线上文件及独立无头 Chrome 验收通过。[本批核验](ZANG_XIA_NV_METALENS_REVIEW_2026-11-20.md) |
| QUALITY-001bs Ji 2025 STED 双波长共焦 | in_progress | 2025-04-23 正式版，2025 年 3 月中科院综合性期刊大类一区。主文 Fig. 3D,G 与补件 Fig. S5 复核 100 μm、设计 NA 0.8 的同一器件，635 nm RCP 和 780 nm LCP 焦位均报 37.5 μm。实心 FWHM 415 nm、环内 FWHM 349 nm，焦区功率／入射功率为 32%／37.8%，690 nm 反向收集为 41.6%。已录同镜双波长、反向测试及两种成像条件共 8 条；补件核对 Fig. S8 功率稳定性。轴向采样、残差、效率积分与入射功率参照面及原始 PSF 待补。0.3.62 经 PR #204 与 Pages 44724496118 发布，330 项测试、238 个线上文件与独立无头 Chrome 验收通过。[主文与补件核验](JI_STED_METALENS_REVIEW_2026-11-20.md) |
| QUALITY-001bt Barulin 2024 双波长荧光超透镜 | in_progress | 2024-01-02 上线，2025 年 3 月中科院综合性期刊大类一区。核主文、补件和公开审稿。500 μm、几何 NA 0.6 实物在 635／670 nm 以 1 μm 步长轴扫，焦位约 330 μm，FWHM 0.77／1.03 μm。635 nm 效率正文为 14.2%、补表为 14.1%，670 nm 均为 37.1%。Fig. 3 逐色峰位、效率积分及试片尺寸冲突待进一步补证。已录主器件汇总、两个谱点和独立 FCS，共 4 条；两色 330 μm 按共有报告精度保留约值。0.3.63 经 PR #206 与 Pages 44733011208 发布，333 项测试、239 个线上文件及独立无头 Chrome 验收通过。[本批核验](BARULIN_DUAL_WAVELENGTH_REVIEW_2026-11-20.md) |
| QUALITY-001bu Zhou 2018 双层近红外双波长共焦 | in_progress | 2026-11-20 查 Crossref 274 次、OpenAlex 294 次。DOI 10.1021/acs.nanolett.8b03017。核 OSTI 接收稿正文及 Fig. 4，500 μm、设计 f 540 μm、NA 0.42 双层实物，在 1180／1680 nm 轴扫得到近共同主焦面。x 向 FWHM 1.74／2.57 μm，效率 38%／52%，像方虹膜直径 8×FWHM。共录 1 只实物、2 个器件与系统配置、4 条记录。轴向峰位、残余焦差、原始 PSF 和 MTF 待补，期刊补件直连 403。0.3.64 经 PR #208 与 Pages 44735856377 发布，335 项测试、240 个公开文件逐一比对及独立无头 Chrome 验收通过。[本批核验](ZHOU_2018_NIR_DOUBLET_REVIEW_2026-11-20.md) |
| QUALITY-001bv Arbabi 2016 空间复用双波长实物 | in_progress | Zhou 2018 引用路线，2026-11-20 查询 Crossref 221 次、OpenAlex 237 次。实录 300 μm、NA 0.46、f 286 μm 的两只实物，独立保留 400 μm 有限共轭设计像距。新增两配置七条，Tables 1–2 的四项 FWHM 和效率及作者理想参考逐格定位。交织镜 915 nm 的约 220 μm 高阶焦另行登记。设计级次逐色焦位、残差和原始强度阵列待补。0.3.65 经 PR #210 与 Pages 44737851635 上线，337 项测试、241 个公开文件及独立无头 Chrome 验收通过。[本批核验](ARBABI_2016_SPATIAL_MULTIPLEX_REVIEW_2026-11-20.md) |
| QUALITY-001bw Ou 2020 偏振控制的中红外消色差器件 | in_progress | 2026-11-20 查 Crossref 151 次、OpenAlex 158 次。核正式主文、补件及六段偏振旋转视频。BAFOV 口径 200 μm，两只实物两偏振的设计焦距均为 200 μm。每只 6 个滤片中心、两偏振、轴扫步长 2.5 μm。BAFS 的作者最高隔离功率比 21 单列。主文 5% 与 1%–6.5% 的百分差未明归属实验或模拟序列，保留印字，数值轴留空。BAFS 口径、各色轴位及原始强度仍待核。[原文核验](OU_2020_MWIR_POLARIZATION_REVIEW_2026-11-20.md) 0.3.68 经 [PR #216](https://github.com/SelinLee/lens-evidence-atlas/pull/216) 与 [Pages 44745371626](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/44745371626) 上线，344 项测试、243 个公开文件及独立无头 Chrome 验收通过。 |
| QUALITY-001bx Wang 2024 32 μm 随机交织全息实物 | in_progress | 正式在线 2023-12-12，2024 年卷期，2025 年 3 月中科院物理与天体物理大类一区。2026-11-20 查 Crossref 57 次、OpenAlex 58 次。核主文 Figs. 3–5 与 §4，录 60 μm 设计焦距、七点实测效率、1 μm 轴扫与 5.26%／15% 同口径比较。保留作者平均约 55% 与本库对七点等权所得 52.69% 的差异。共 4 配置、11 条，逐波长最佳焦位、原始 PSF、FWHM 和 MTF 数表待核。Wiley 补件入口 403，Fig. S9/S11/S12 待补证。[原文核验](WANG_2024_HOLOGRAPHIC_RIL_REVIEW_2026-11-20.md) 0.3.67 经 [PR #214](https://github.com/SelinLee/lens-evidence-atlas/pull/214) 与 [Pages 44743460357](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/44743460357) 发布，341 项测试、242 个文件和六视口独立无头 Chrome 验收通过。 |
| QUALITY-001by Shi 2018 四波长反射式可见光消色差镜 | in_progress | 2026-11-20 查 Crossref 224 次、OpenAlex 239 次。正式版 Fig. 4 给 MAM 口径 400 μm、NA 0.2、四波长焦位、Strehl 与聚焦效率。实测焦距跨度由本库算为 9 μm；效率分母为经校正的同口径银镜反射功率。两只 WCBG 的 980 μm 同平面结果和六个效率原印值已登记，逐色轴向峰位与 WCBG 分母待核。ACS 补件目录列有实测焦长，直连 403。逐点 FWHM、原始 PSF、MTF 和补件待查。[本批核验](SHI_2018_VISIBLE_MULTI_WAVELENGTH_REVIEW_2026-11-20.md) 0.3.69 经 [PR #218](https://github.com/SelinLee/lens-evidence-atlas/pull/218) 与 [Pages 44747513197](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/44747513197) 上线，347 项测试、244 个文件和六视口独立无头 Chrome 验收通过。 2026-11-23 取得原补件，Fig. S7 新录同一 MAM 的 510 nm 主/次峰 870/1050 μm 与 520 nm 主峰 1030 μm。520 nm 次峰的原印 0.85 nm 单位冲突，数值留空。原始 PSF 和 MTF 待查。 0.3.85 经 [PR #249](https://github.com/SelinLee/lens-evidence-atlas/pull/249) 和 [Pages 45046100851](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/45046100851) 发布。370 项测试、260 个公开文件及线上独立无头 Chrome 验收通过。 |
| QUALITY-001bz Cheng 2019 双结构太赫兹消色差实物 | in_progress | 2026-11-20 查 Crossref 141 次、OpenAlex 149 次。南大正式主文与 Elsevier 补件公开，C 形及矩形实物各六频率。C 形 D 10 mm、NA 0.385，名义焦长 12 mm 与图示 12.5 mm 分开。矩形 NA 0.43，0.5 THz 实测焦长约 10.5 mm。四个横向 FWHM、效率协议和同文 PB 模型已登记。逐频率焦峰、残差、效率数表、MTF 与原始 PSF 待核。[原文核验](CHENG_2019_THZ_ACHROMAT_REVIEW_2026-11-20.md) 0.3.71 经 [PR #220](https://github.com/SelinLee/lens-evidence-atlas/pull/220) 和 [Pages 44751981763](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/44751981763) 上线，349 项测试、245 个文件和六视口独立无头 Chrome 验收通过。 |
| QUALITY-001ca Dai 2021 五波长可见光超分辨镜 | in_progress | 2026-11-22 查 Crossref 54 次、OpenAlex 57 次。原刊摘要和课题组发布核五个实测波长 520／555／632.8／660／690 nm，制备镜 NA 0.95 据校方报告。原刊正文及补件入口 403，校方正文索引可读、浏览器入口 412 后 400。宽度范围仅作文字，实际共同焦面、逐频残余焦差、效率及原始数组继续追原图和第一作者学位论文。0.3.81 经 PR #240 和 Pages 45036684311 发布。365 项测试、257 个线上文件与独立无头 Chrome 六视口验收通过。[本批核验](DAI_2021_HOLOGRAPHIC_ACHROMATIC_EVIDENCE_2026-11-22.md) |
| QUALITY-001cb Jiang 2026 大口径双偏振太赫兹 | in_progress | 2026 年正式发表，综合性期刊大类一区（2025 年 3 月表）。录入同镜轴峰和等倍成像两配置共 46 条，含 22.1 mm 口径、NA 0.13、设计焦距 80 mm、x/y 九点实测均值 81.7 mm、ACV 2.86%／2.84%、平均效率 46.97%／46.14%、单独标注的模拟宽度及固定光路成像。Fig. 6f 图内 x、图注 y；重复的补件刻度已标明。DataCite 和 Zenodo 精确 DOI 查询均为 0，作者指向合理请求。逐频点实测焦位、焦斑、效率与 MTF 留待原始数据。0.3.72 经 PR #222 和 Pages 44754924112 发布，351 项测试、246 个公开文件哈希及独立无头 Chrome 验收通过。[本批核验](JIANG_2026_LAPIAM_THz_REVIEW_2026-11-20.md) |
| QUALITY-001cc Hsiao 2018 可见光整合共振单元 | in_progress | Crossref 81 次、OpenAlex 93 次（2026-11-20）。录入原刊摘要可核的 420–650 nm、NA 0.124 实物和 420／550／650 nm 三条效率。图版转载定位另外两种 NA、色散对照及轴扫，实物口径、设计焦距、逐色峰位、FWHM 及效率协议待核。正式主文和 `adom201800031-sup-0001-S1.pdf` 返回 403，精确 DOI 数据仓库查询为 0。0.3.73 经 PR #224 和 Pages 44757239955 上线，353 项测试、247 个发布文件和独立无头 Chrome 验收通过。[本批核验](HSIAO_2018_VISIBLE_IRU_REVIEW_2026-11-20.md) |
| QUALITY-001cd He 2026 双螺旋 PSF 消色差 | in_progress | 入库 1200–1400 nm 实物汇总，原刊摘要支持光学相位补偿，补件预览给 500 nm 元胞周期。保留 14.39 倍能量利用效率提升说法，原始归一与参照待核。完整补件 ph5c02219_si_001.pdf 返回 403，逐色旋角、深度、几何及原始二维 PSF 留待补证。0.3.74 经 PR #226 与 Pages 44759868429 发布，355 项测试、249 个文件比对及独立无头 Chrome 验收通过。[本批核验](HE_LIU_CHROMATIC_EVIDENCE_2026-11-20.md) |
| QUALITY-001ce Tang 2026 折超双片热成像 | todo | 核到作者图注的 8.0／10.1／12.6 μm 单色实测 MTF 和三场点的宽带 MTF。核定 2026-06-13 上线及两类实测 MTF 图注。主文 PDF 与补件 DOCX 返回 403，继续核色散校正式、固定像面、原始数据及频率归一。[原刊](https://onlinelibrary.wiley.com/doi/10.1002/lpor.71431) |
| QUALITY-001cf Liu 2024 长波红外消色差折超双片 | in_progress | 2026-11-20 查 Crossref 56、OpenAlex 60。已录实物 8–12 μm、全视场角 >20° 及被动成像。补件目录列三类配置比较和双片实测 MTF，处方、逐色焦差、焦斑、MTF 协议及数表继续追踪。0.3.74 经 PR #226 与 Pages 44759868429 发布，355 项测试、249 个文件比对及独立无头 Chrome 验收通过。[本批核验](HE_LIU_CHROMATIC_EVIDENCE_2026-11-20.md) 2026-11-23 核 ACS Figshare 条目 26018298 v1、文件 46996986、16 页、1811619 字节、MD5 4433304e221ff9e76f7bb33cc7c61a5b。下载返回 403，期刊页补件预览 Note 1 报设计 f=13 mm、F/1.5。实测 MTF 数值与协议仍待核。[ACS 文件登记](https://widgets.figshare.com/public/articles/26018298/versions/1/files) |
| QUALITY-001cg Choi 2025 厘米级 RGB 三色焦位补证 | in_progress | 2025 年 3 月中科院材料科学大类一区。0.3.75 经 PR #228 与 Pages 44762655949 发布，356 项测试、249 个文件哈希及独立无头 Chrome 验收通过。已结构化录入 635 nm 对名义设计焦距的 5.77 μm、0.11% 幅值，同一器件三谱点平均有效 NA 约 0.55，以及 0.5 μm 轴扫步进和各色 PSF 采集面。待补三色绝对峰位、RGB 互差、零点和横向标尺、原始 PSF 与效率积分范围及分母。[本批核验](CHOI_RGB_AXIAL_EVIDENCE_2026-11-20.md) |
| QUALITY-001ch Hu 2016 等离激元晶格多波长消色差 | todo | ACS Nano，DOI 10.1021/acsnano.6b05855，2026-11-20 查 Crossref 101 次、OpenAlex 114 次。原刊列 600／785／980 nm，补件目录区分两色、三色模拟与焦距结果。原刊全文和 nn6b05855_si_001.pdf 在本机无头 Chrome 返回 403，组件登记有效。继续核三色是否使用实际制备的同一器件、实验焦位与偏振。[原刊](https://pubs.acs.org/doi/10.1021/acsnano.6b05855) · [补件登记](https://api.crossref.org/works/10.1021/acsnano.6b05855.s001) 2026-11-23 取得 ACS 原始补件 nn6b05855_si_001.pdf。pp.15–20 Figs. S11、S13–S16 的三色和逐焦距数字来自 FDTD。印刷 pp.S17–S18 说明 2 nm Ti 实物有次峰，作者未观测到模型的微小焦位变化。继续核主文原始测量与同一器件归属。[原始补件](https://pstorage-acs-6854636.s3.amazonaws.com/6639999/nn6b05855_si_001.pdf#page=17) |
| QUALITY-001ci Hu 2024 四镜全斯托克斯可见光消色差 | todo | 原刊报告 450–650 nm 四枚偏振选择镜的全彩成像，arXiv 作者稿可下载，公布的三点误差属于 Stokes 重建。Nano Letters 在 2025 年表为大类二区，2026-11-22 重查 Crossref 27 次、OpenAlex 46 次。正式补件 .s001 可查注册，Figshare 检索本机 403。保留检索记录及原始逐色焦位待核。[原刊](https://pubs.acs.org/doi/10.1021/acs.nanolett.4c03785) · [作者稿](https://arxiv.org/abs/2404.11415) |
| QUALITY-001cj Peng 2025 5 mm 两栖相机消色差镜 | in_progress | 2025 年 3 月中科院材料科学大类一区。录入口径、设计焦距和 450–850 nm 设计范围，Fig. 2 横向及轴向焦斑图注和作者 FWHM 区间。另保留混合现实相机与系统原型。正文、原图及 adfm73172-sup-0001-SuppMat.docx 返回 403，实验谱点、绝对焦位、宽度归属、效率与 MTF 待补。0.3.76 经 PR #230 与 Pages 44767432355 发布，358 项测试、251 个文件比对及独立无头 Chrome 验收通过。 [本批核验](PENG_XU_ACHROMATIC_EVIDENCE_2026-11-20.md) |
| QUALITY-001ck Xu 2023 夹层太赫兹消色差实物与色散对照 | in_progress | 2026-11-20 查 Crossref 54 次、OpenAlex 59 次。原刊摘要与实测图注确认 0.5–1.1 THz、NA 0.47、带内效率 43.1%、Fig. 4e 横向焦斑参考面 6.5 mm。Fig. 5 有实测焦位、宽度、效率及同篇对照。正文 PDFDirect 与补件返回 403，逐频原值、实际口径、效率协议和 MTF 待补。0.3.76 经 PR #230 与 Pages 44767432355 发布，358 项测试、251 个文件比对及独立无头 Chrome 验收通过。 [本批核验](PENG_XU_ACHROMATIC_EVIDENCE_2026-11-20.md) |
| QUALITY-001cl Sun 2025 BaF₂ 红外折超部分消色差 | in_progress | ACS Nano，DOI 10.1021/acsnano.5c11908，2025 年 3 月中科院材料科学大类一区。已取 PMC 正式 PDF、原图和补件。录入 V5/V6 的 40 mm 裸镜几何与单色干涉 Strehl、V5/V6 的 BaF₂ 混合配置、V5 的 CaF₂ 对照与 Fig. 4f 约 F/1.5。Southampton ePrints 506133 记录与元数据导出返回 403。继续找逐谱点焦位、原始 PSF／MTF 与混合镜效率协议。0.3.77 经 PR #232 与 Pages 44770283229 发布，359 项测试、252 个公开文件比对及独立无头 Chrome 验收通过。[本批核验](SUN_LWIR_HYBRID_EVIDENCE_2026-11-21.md) |
| QUALITY-001cm Chen 2025 三维打印太赫兹消色差实物 | in_progress | Nature Communications，DOI 10.1038/s41467-024-55624-w，2025 年 3 月中科院综合性期刊大类一区。已核正式主文、补件与透明审稿答复，录入单镜 6 mm/4.5 mm/NA 0.555、八个正入射频点、Fig. S12 九个离轴 u 向 FWHM 及两种成像配置。0.8、0.9 THz 的效率正文与图中顺序相反，暂缺实测积分及分母。逐频峰位、残余焦差、原始 PSF 及 MTF 待补。0.3.78 经 PR #234 与 Pages 44773664848 发布，361 项测试、253 个公开文件比对及独立无头 Chrome 验收通过。[本批核验](CHEN_2025_GRIN_THZ_EVIDENCE_2026-11-21.md) |
| QUALITY-001cn Ou 2022 可见光液晶偏振复用消色差 | in_progress | Nano Letters，DOI 10.1021/acs.nanolett.2c03798。2026-11-21 查 OpenAlex 94 次。录入同一 40 μm 镜片的 0 V 和 5 V 两状态，每组六个实测谱点，另有同文白光色散与定制色散对照。焦面效率的分母为同焦面全部光强。ACS 与 Figshare 入口返回 403，逐色焦位和效率、原始 PSF 与 MTF 留待补证。0.3.79 经 PR #236 与 Pages 44777485987 发布，363 项测试、255 个公开文件及独立无头 Chrome 验收通过。[本批核验](OU_WANG_LC_ACHROMATIC_EVIDENCE_2026-11-21.md) 2026-11-23 核 ACS Figshare 条目 21685191 v1、文件 38457069、562427 字节、登记 MD5 4630e9b5ae2cebe694a45bc3cb7d2511。条目 21685194 是影片组件。PDF 两个下载入口返回 403，逐色焦位仍待查。[ACS 文件登记](https://widgets.figshare.com/public/articles/21685191/versions/1/files) arXiv 源文件入口仅 22 页 v1 PDF，无嵌入附件。两电压配置均补 Fig. 2e 载明的 400 nm 周期及 ACS 文件登记。 |
| QUALITY-001co Wang 2025 液晶开关双焦消色差 | in_progress | Laser & Photonics Reviews，DOI 10.1002/lpor.202501901。已核南京大学公开的 Wiley 正式版，录入 1.0–1.6 THz 的实测平均焦距 10.20／13.76 mm、平均效率 23.9%／26.1%、带端的四个 FWHM 和同镜成像。相对原点的逐频最佳焦位、残余焦差和 MTF 原始数组待补，Wiley 正式补件直连 403。0.3.79 经 PR #236 与 Pages 44777485987 发布，363 项测试、255 个公开文件及独立无头 Chrome 验收通过。[本批核验](OU_WANG_LC_ACHROMATIC_EVIDENCE_2026-11-21.md) |
| QUALITY-001cp Shen 2020 同一液晶镜的消色差／色散切换 | in_progress | Advanced Photonics，DOI 10.1117/1.AP.2.3.036002。2026-11-21 查 Crossref 138、OpenAlex 149 次。录入同一 6.48 mm 名义口径镜的两个电压、每状态六个实测频点和固定物像距成像。无偏压设计 15 mm、实测概述约 12 mm，FWHM 固定面为 12／13 mm。约 26.1%／33.9% 跨频效率以入射 LCP 功率作分母。补件登记可达，下载返回 HTML；效率积分、逐频轴峰及原始场待核。0.3.80 经 PR #238 和 Pages 44780510388 发布。364 项测试、256 个线上文件及独立无头 Chrome 六视口验收通过。[本批核验](SHEN_2020_SWITCHABLE_THZ_EVIDENCE_2026-11-21.md) |
| QUALITY-001cq Zhao 2020 振幅调控亚衍射太赫兹透镜 | in_progress | 2026-11-22 查 Crossref、OpenAlex 各 69 次。录入 10.22 mm 设计孔径、NA 0.125、40.39 mm 名义焦距及原刊 Fig. 6 的 2.54 THz／118.11 μm 单频与波长。课题组 2.4–2.6 THz 实验范围单独说明。完整实验谱点、绝对焦位、两向 FWHM、效率和原图继续追。 0.3.82 经 PR #242 和 Pages 45038266725 发布。367 项测试、259 个线上文件与独立无头 Chrome 六视口验收通过。[本批核验](ZHAO_YUAN_SUPEROSCILLATORY_EVIDENCE_2026-11-22.md) |
| QUALITY-001cr Yuan 2017 RGB 同时照明超振荡焦斑 | in_progress | 2026-11-22 查 Crossref 168、OpenAlex 190 次。正式 Fig. 5 与补件 Table S1 第 4 号镜，直径 40 μm、目标面 10 μm、三个实测宽度和中央焦斑能量比例。原图同时点亮三色，接收 NA 与几何 NA 单列。Southampton 数据 DOI 有效，文件页 403，待原始采样与残余焦差。 0.3.82 经 PR #242 和 Pages 45038266725 发布。367 项测试、259 个线上文件与独立无头 Chrome 六视口验收通过。[本批核验](ZHAO_YUAN_SUPEROSCILLATORY_EVIDENCE_2026-11-22.md) |
| QUALITY-001cs Lin 2025 厘米级可见光超临界透镜 | out_of_scope | 原文 §2A 与 Fig. 1 的校正器件为 52 级同心光刻胶环带。Fig. 4 有七个 400–700 nm 实测焦斑，Fig. 5 有同面白光和 RGB 成像。器件属多级衍射透镜，保留检索记录。逐色最佳焦位、残余焦差和原始 PSF／MTF 待补。[本批核验](LIN_2025_CENTIMETER_ASCL_EVIDENCE_2026-11-22.md) |
| QUALITY-001ct Zhang 2022 长波红外全斯托克斯超透镜 | in_progress | 2026-11-22 查 Crossref 231 次、OpenAlex 235 次。主文 Fig. 5、补件 Fig. S4 显示同面附近的四谱点轴扫。录入单子镜名义 D 1.7243 mm、f 10 mm、X 偏振 31.8%／33.5%／46.2%／46.3% 及积分和分母说明。逐色焦位、FWHM、L 偏振效率保留图点，原始数据待补。0.3.83 经 PR #245 与 Pages 45041109128 发布，368 项测试、260 文件比对及独立无头 Chrome 验收通过。[本批核验](ZHANG_2022_LWIR_STOKES_EVIDENCE_2026-11-22.md) |
| QUALITY-001cu 2026 双螺旋可见光消色差超透镜 | out_of_scope | Nano Letters，DOI 10.1021/acs.nanolett.6c02238，2026-07-20 在线。正式摘要和补件目录明列可见光宽带双螺旋焦斑及器件制备。2025 年 3 月中科院材料科学大类二区，暂存检索记录，待经典文献引文条件变化。已定位 ACS Figshare 条目 33040335 v1、文件 66824679，下载返回 403。[正式摘要](https://doi.org/10.1021/acs.nanolett.6c02238) · [武汉大学图书馆分区](https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=13648) · [2025 年分区版本](https://www.ais.cn/journal/database/6024) · [ACS 文件登记](https://widgets.figshare.com/public/articles/33040335/versions/1/files) |
| QUALITY-001cv Liu 2026 NURBS 自由曲面元胞 | out_of_scope | Nanophotonics，DOI 10.1002/nap2.70222，2026-07-29 正式上线。正文实制 200 μm 口径、405–633 nm 五点 PSF。2025 年 3 月中科院物理与天体物理大类二区，2026-11-23 查 Crossref 和 OpenAlex 各 0 次，暂存检索记录。[原文](https://doi.org/10.1002/nap2.70222) · [2025 年分区](https://www.booksci.cn/journal/19027.htm) · [Crossref](https://api.crossref.org/works/10.1002/nap2.70222) · [OpenAlex](https://api.openalex.org/works/W7171613655) |
| QUALITY-001cw Kai Ou 2021 全硅中波红外宽带消色差 | in_progress | 2021-07-09 正式上线。2026-11-23 查 Crossref 117 次、OpenAlex 120 次。原文摘要、Figs. 1–5 图注分辨 BAPVM、BAPIM1、BAPIM2 与 BAFOVG，四样片八行。录入 BAFOVG 实物口径 200 μm、NA 0.24、4000 nm 轴向图，BAPVM 柱高 4.5 μm、周期 1.65 μm 和两偏振 4000 nm 焦斑。BAPIM 以其测量均焦作参照，效率和 Strehl 曲线保留原入口，数字与精确分派留空。期刊补件及图版下载返回 403。继续核全文、补件、各实物的逐色焦位及效率协议。[本批核验](OU_2021_MWIR_REVIEW_2026-11-23.md) 0.3.87 经 [PR #253](https://github.com/SelinLee/lens-evidence-atlas/pull/253) 与 [Pages 45049527467](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/45049527467) 发布，370 项测试、261 个公开文件及六视口独立无头 Chrome 验收通过。 |
| QUALITY-001cx Yuan 2026 长波红外双焦测温及测距 | done | DOI 10.1002/advs.75776，2026-05-28 正式上线，2025 年 3 月升级版综合性期刊大类一区。原文 §4 称宽带消色差，§3.1 用 λc=10.6 μm 设计两偏振焦位，Figs. 4–5 展示 10.6 μm 双焦离焦测距与双带辐射测温。PMC 原版 12 页与正式补件 Notes S1–S3、Figs. S1–S3 未见同一偏振跨波长焦位或光学校正佐证。保留检索。 [原版 §3.1](https://pmc-oa-opendata.s3.amazonaws.com/PMC13336119.1/PMC13336119.1.pdf#page=5) · [正式补件](https://pmc-oa-opendata.s3.amazonaws.com/PMC13336119.1/ADVS-9999-e75776-s001.docx) · [分区](https://www.ais.cn/journal/database/9591) |
| QUALITY-001cy Wang 2022 ANN 可见光消色差 | in_progress | DOI 10.1002/adom.202101842，2021-11-23 正式上线，2022 年卷期。2026-11-25 Crossref 59、OpenAlex 71，纳入经典研究。作者 Fig. 1、4 图注明示 20.8 μm 设计口径、400 nm 柱高、320 nm 周期、平均实测 f=124 μm、实验 NA 0.084、平均效率 40%。按一个器件录两行。420–640 nm 为原文工作范围，逐色实测列表、残余焦差、效率分母和焦圈及原始数组待取。主文及补件返回 403，图版入口连接复位。见[本批核验](WANG_ANN_VISIBLE_REVIEW_2026-11-25.md)。 0.3.88 经 [PR #255](https://github.com/SelinLee/lens-evidence-atlas/pull/255) 与 [Pages 45577495146](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/45577495146) 发布，371 项测试、262 个公开文件和独立无头 Chrome 验收通过。 清华通讯作者孙竞博的官方教师目录列原作，未列原文件。CLEO 2022 FW1C.6 的正式入口仅开放摘要；继续按作者机构全文/学位论文查实物参数和原始焦位。[通讯作者目录](https://www.mse.tsinghua.edu.cn/info/1024/1608.htm) · [会议](https://opg.optica.org/abstract.cfm?uri=CLEO_QELS-2022-FW1C.6) |
| QUALITY-001cz Wei 2026 神经消色差成像及 Xiao 2026 宽视场设计筛选 | todo | Wei DOI 10.1002/lpor.72001，2026-10-06 上线，摘要的色差减少和 PSNR 提升属图像重建结果。作者公开仓库目录只核到处理代码，原始 PSF 未定位。未核到实物光学校正，留检索待全文/SI。Xiao DOI 10.1364/OE.600642，正式版 §3 明示结果来自全波仿真。暂存检索，不入主矩阵。[Wei](https://onlinelibrary.wiley.com/doi/10.1002/lpor.72001) · [作者仓库](https://github.com/THUHoloLab/Neural-Achromatic-Imaging) · [Xiao](https://opg.optica.org/oe/abstract.cfm?uri=oe-34-12-21664) |
| QUALITY-002 手机SNR/MTF/色差独立测量 | in_progress | 本机Codex，2026-11-14；先核有型号和协议的SNR及MTF原始研究；外接镜组、场景与处理链不得写进原生模组，PSNR不替代SNR |
| QUALITY-003 VRAR MTF与色差 | in_progress | 本机Codex，2026-11-14；复核开放PR #69数据及原文，优先MTF/截止频率、颜色/场点/眼位、色差和先进设备独立测量，不能从曲线猜统一单值 |
| QUALITY-001a 文献器件首批 | done | 4项原始研究/8器件配置/21行，几何、波段、逐谱点焦距/FWHM/Strehl、PSNR及冲突；见[首批核验](QUALITY_BATCH_2026-11-14.md)；PR #72/23fdecb与Pages43571286647实页验收，不关闭父目标 |
| QUALITY-001b 可见光消色差与效率口径 | done | Codex，2026-11-14，codex/visible-achromatic-evidence；核Wang 2018正式主文/SI与Chen 2018作者存档稿/正式SI，分离设计示例与实验器件、带内均值与指定波长效率、偏振与分母/焦圈；七配置及效率/偏振五字段，130项测试；见[原文核验](VISIBLE_ACHROMATIC_REVIEW_2026-11-14.md)，PR #74/f5f6394及Pages43573407984完成12文件/线上六视口验收；原生手机和先进XR任务保持开放 |
| QUALITY-001c 用户指定四项文献 | done | 2026-11-14定向任务；Balli/Lin/Chang/Choi四研究、54条透镜记录及1条XR原型；143测试通过。PR #77/93edab2、CI43579087454及Pages43579087443成功；公开12文件一致，线上36域/六视口/引用/分享/导出实测通过，见[本批核验](LOCAL_REFERENCES_REVIEW_2026-11-14.md)。仅完成本次请求，持续队列保持paused |
| QUALITY-002a 外接微距SNR | done | 原作Table4的2历史手机×7视图均值/SD/n；只属外接研究模组，原生主摄和先进型号仍缺；PR #72发布及实页验收 |
| QUALITY-002b 原生手机MTF与处理链 | done | Codex，2026-11-14；六历史手机的软件原表刻度与Beveridge脚注两单位明示报告共八行/四字段，保留频率轴/模组/统计缺口；135测试及Chrome六视口通过。PR #76/31d8b05、CI43577108604、Pages43577108577成功，公开12文件一致及线上引用返回/分享/导出实测通过，见[原生核验](NATIVE_PHONE_MTF_REVIEW_2026-11-14.md)；仅关闭本批，原生SNR/色差和当前旗舰父任务继续开放 |
| QUALITY-003a XR静态截止与研究协议 | done | 复用并复核PR #69三配置数据，新增正文6/8/9/12 CPD近似截止；不当MTF50；PR #72发布及实页验收，不关闭先进设备/AR缺口 |
| FOCUS-005 测试、发布和完成审计 | in_progress | 校验/测试、Chrome无头桌面/手机、PR、实际Pages文件及数据核对；按新目标逐条审计，明确已有/候选/缺失，不能以仅有草稿或测试通过代替交付 |

最初目标调整时的历史记录：没有刷新科学数据版本、型号规格核验日期或声称新表格/图表已上线。旧目标全领域未完成部分被用户从当前范围撤下，不标记成完成。

## 使用与完成规则

- 开始一批工作：同步远程，检查已有 PR 和日志，核对当前数据，选取 1–3 个明确任务；登记负责人、状态、日期和工作分支，避免重复研究。
- 工作顺序用 **Q0 / Q1 / Q2** 表示，分别为首批、随后、后续。它们只表示维护队列，**不是光学指标的重要性名次**。
- 状态为 `todo`（待处理）、`in_progress`（进行中）、`blocked`（有具体外部阻碍）、`review`（交付待审核）、`done`（验收并合并）、`reopen`（证据变化后重开）。无人认领时负责人填 `—`。
- 搜索未发现足够证据时，记录检索词、范围、日期、排除理由和续查路径；保留数据的待补证状态，不将“搜索过”标成“已补齐”。没有统一排序可以是有依据的结论，但须说明适用任务与检索边界。
- 数据证据状态与任务状态分开：`done` 不等于获得作者排序或世界纪录。原文排序、编辑判断、未建立排序沿用数据契约。
- 每批更新本表的日期、产物/PR 和日志链接；仅实际重读的来源更新核验日期。网页部署需单独记录部署版本，不能用 Git 合并代替。
- 不凭记录数判定完成。来源独立性按厂商/研究团队与实际数据来源判断；同一论文、同一团队或同一厂商的变体不能算多个独立来源。

通用验收：结论绑定原文位置、读取范围、适用条件和真实核验日期；未知项显式保留；数据/定义/引用/展示一致；相关测试及构建通过；PR 提供证据边界和验收说明，合并后才能将任务改为 `done`。涉及网页数据的任务须记录GitHub Pages是否实际发布及其版本，未发布继续列为交接事项。

## 初始化基线

审计日期：**2026-11-06**。统计依据：已提交版本 [`bcc3361`](https://github.com/SelinLee/lens-evidence-atlas/commit/bcc33610af40e2833eda3c77b276941c761a89b3)，catalog `0.1.0`。这是历史快照，不是自动更新的实时统计；后续批次应在日志中记录新的基线及差异。

| 项目 | 基线 | 证据边界 |
| --- | ---: | --- |
| 应用 | 33 | 应用指标映射仍为候选导航，不能当作已证明的重要性 |
| 指标定义 | 20 | 有定义不代表已满足所有应用的测量口径 |
| 来源条目 | 76 | 包括标准索引和厂商资料，不等于 76 篇独立实测论文 |
| 性能/规范记录 | 55 | 同源型号和变体分别计数，不能据此判断独立样本量 |
| 标准索引 | 18 | 索引条目不等于已经读到适用条款全文 |
| 编辑性优先级应用 | 7 | 不是作者给出的名次 |
| 原文明示排序应用 | 0 | 不强行为达到覆盖率编造排序 |
| 未建立排序应用 | 26 | 按具体任务逐项补证 |
| 限定范围最佳/界限 | 2 | 一项论文内最佳、一项理论界限；无世界纪录声明 |

本轮只建立任务和交接文档，未重新核验论文、产品或标准原文。主工作目录另有进行中的研究分支，未提交结果未纳入此基线；续接时先检查是否已合并。

## 工作队列

本机 Codex 与 Dot 共用此队列；范围见 [本机研究目标](LOCAL_RESEARCH_GOAL.md)。

下表是状态记录；各任务正文提供缺口与验收条件。建档时全部未认领；2026-11-06 首批仅拆分提交以下子任务供审核，父任务尚未完成的验收保留。队列日期不是来源核验日期。

| ID / 任务 | 队列 | 状态 | 负责人 | 更新日期 | 依赖 | 产物 / Issue / PR |
| --- | --- | --- | --- | --- | --- | --- |
| [EVD-001 低 NA 微成像](#evd-001) | Q0 | in_progress | 本机Codex汇总 | 2026-11-06 | — | — |
| [EVD-002 光片照明](#evd-002) | Q0 | in_progress | 本机Codex汇总 | 2026-11-06 | — | — |
| [EVD-003 微透镜阵列](#evd-003) | Q0 | in_progress | 本机Codex汇总 | 2026-11-06 | — | — |
| [EVD-004 单模光纤耦合](#evd-004) | Q0 | in_progress | 本机Codex汇总 | 2026-11-06 | — | — |
| [EVD-005 机器视觉](#evd-005) | Q1 | in_progress | 本机Codex | 2026-11-06 | — | — |
| [EVD-006 远心测量](#evd-006) | Q1 | in_progress | 本机Codex | 2026-11-06 | — | — |
| [EVD-007 显微物镜](#evd-007) | Q1 | todo | — | 2026-11-06 | EVD-001 范围划分 | — |
| [EVD-008 OCT](#evd-008) | Q1 | in_progress | 本机Codex | 2026-11-06 | — | — |
| [EVD-009 近红外感知](#evd-009) | Q1 | in_progress | Codex | 2026-11-06 | — | — |
| [EVD-010 现有 7 类优先级复核](#evd-010) | Q0 | in_progress | 本机Codex汇总 | 2026-11-06 | 与应用任务共享证据 | — |
| [EVD-011 其余 26 类排序缺口](#evd-011) | Q2 | todo | — | 2026-11-06 | 重点应用任务优先 | — |
| [EVD-012 缺失指标定义](#evd-012) | Q1 | todo | — | 2026-11-06 | 按应用任务需求拆分 | — |
| [EVD-013 样本比较条件](#evd-013) | Q0 | todo | — | 2026-11-06 | 与 EVD-001–004 并行落实 | — |
| [EVD-014 两项最佳/界限复核](#evd-014) | Q0 | done | Codex / dot | 2026-11-07 | EVD-003 / 004 共享来源 | [完成审计](SCOPED_BESTS_COMPLETION_AUDIT_2026-11-07.md)；PR #3 / #4 |
| [EVD-015 标准版本与适用条款](#evd-015) | Q1 | todo | — | 2026-11-06 | — | — |
| [EVD-016 工艺、容差与不确定性](#evd-016) | Q1 | todo | — | 2026-11-06 | 先落到 EVD-001–004 | — |
| [EVD-017 来源读取范围复核](#evd-017) | Q1 | todo | — | 2026-11-06 | 随来源复读逐条处理 | — |
| [EVD-018 条件化比较集合](#evd-018) | Q2 | todo | — | 2026-11-06 | EVD-013、对应应用样本 | — |
| [EVD-001a Wang 低 NA 元件](#evd-001a) | Q0 | done | dot | 2026-11-06 | EVD-001 / 017 的局部交付 | [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3) |
| [EVD-002a Luo 照明/系统边界](#evd-002a) | Q0 | done | dot | 2026-11-06 | EVD-002 / 013 / 017 的局部交付 | [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3) |
| [EVD-004a Jovanovic 耦合实测](#evd-004a) | Q0 | done | dot | 2026-11-06 | EVD-004 / 013 / 017 的局部交付 | [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3) |
| [EVD-013a 引用与比较防线](#evd-013a) | Q0 | done | dot | 2026-11-06 | 为 EVD-013 / 018 提供校验，非完成比较集合 | [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3) |
| [EVD-014a Richards 论文内范围](#evd-014a) | Q0 | done | dot | 2026-11-06 | EVD-014；不替代 EVD-003 阵列任务 | [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3) |
| [EVD-003a 喷墨阵列几何](#evd-003a) | Q0 | done | dot | 2026-11-06 | EVD-003 / 012 / 013 的局部交付 | [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3) |

建议首批从 EVD-002 和 EVD-004 中选择尚未被认领的具体缺口，同时完成相应的 EVD-013 条件记录；先核对现有研究分支/PR，避免重复。跨领域大任务应先拆成可一次审核的小任务。

## 本机光片定义与实验整合

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-002d Shi单珠实验与含能量宽度 | Q0 | done | 本机Codex | 2026-11-06 | codex/light-sheet-sectioning；整合PR #19；[核验笔记](SHI_LIGHT_SHEET_REVIEW_2026-11-06.md) |
| EVD-010b 光片无统一次序的任务权衡 | Q0 | done | 本机Codex | 2026-11-06 | 同上；撤下笼统P1/P2，保留出处 |
| EVD-017b Luo作者PDF图页与检测条件 | Q1 | done | 本机Codex | 2026-11-06 | 同上；原文差异与效率分母仍缺 |

- [x] 原始主文/SI相关页核验，三配置只计一个独立研究；模拟与实验不混用。
- [x] 沿用EVD-002c的稳定指标ID，保留Remacha比例差异，补Shi半宽定义与引用；公开托管不变。
- [x] 42项测试、构建、Chrome无头桌面及手机视口定向验收通过。
- [x] 整合PR #19头1236892的CI成功，合并源0962909；Pages运行42220942743成功，公开HTTPS实际0.1.14并完成Chrome桌面/手机视口定向验收。
- 父任务EVD-002/010/017继续开放：尚无同协议实测含能量宽度集合，Luo分母及文内差异未消歧。

## 云端光片定义增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-002c 主峰与含能量切片宽度 | Q0 | done | dot（云端） | 2026-11-06 | [草稿PR #19](https://github.com/SelinLee/lens-evidence-atlas/pull/19)；[核验笔记](SECTIONING_DEFINITION_REVIEW_2026-11-06.md) |

- [x] 直接核读方法原文，区分峰值阈值、包含能量比例与传播长度阈值；保留63%/67%冲突。
- [x] 来源、独立指标定义、应用导航落库；旧实验数值及来源核验范围不变。
- [x] 38/38测试、构建、DOM查询与引用回归通过。
- [x] 云端原预览连接失败；本机整合后使用独立Chrome无头完成桌面/手机视口的定义、来源、查询与弹窗验收。
- [x] 科学提交aac934f已推送并创建草稿PR #19；远程树与本地测试树完全一致。
- [x] 本机补直接原文审核，整合头1236892通过42项CI；PR #19已合并，源0962909。
- [x] 已随整合目录0.1.14实际发布，Pages运行42220942743成功；独立Chrome无头访问公开页面验收通过（日志19）。
父任务EVD-002仍缺可比实测含能量宽度、Luo分母/主文差异消歧和统一有效长度协议，不关闭。

## 云端独立光片增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-002b 静态Airy照明三位置实测 | Q0 | done | dot / 本机Codex验收 | 2026-11-06 | [草稿PR #17](https://github.com/SelinLee/lens-evidence-atlas/pull/17)；[核验笔记](BATTISTELLA_AIRY_REVIEW_2026-11-06.md) |

- [x] 新增独立论文与实验记录，明确首主峰FWHM、测量位置/方法及同源性。
- [x] 分开实测取样范围、模型FOV与系统PSF；定义、条件、来源逐参数落库；保留未知项。
- [x] 35项测试、构建、diff检查通过；DOM夹具核对五参数/定义/来源及重复、空、清空筛选。
- [x] 科学提交045a08e已推送并创建草稿PR #17；独立只读科学复核未发现实质错误。
- [x] 最终头f2e5645的CI通过；已保留公开GitHub托管更改。
- [x] 本机补读PDF Fig.3/方法，Chrome无头桌面和390 px手机视口定向验收；PR #17已合并，源531e04d。
- [x] 本机验收后Pages运行42198770979成功，实际HTTPS目录为v0.1.9；当前批次保持停止Sites发布。
父任务EVD-002仍缺Luo分母/主文差异消歧、旁瓣背景、可比独立系统与统一有效长度判据，不关闭。

## 本机低NA成像增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-001c 可见标靶与扫描模式区分 | Q0 | done | 本机Codex | 2026-11-06 | codex/low-na-imaging-evidence；[核验笔记](LOW_NA_IMAGING_REVIEW_2026-11-06.md) |
| EVD-010a 作者限定任务相对次序 | Q0 | done | 本机Codex | 2026-11-06 | 同上；非整个物镜任务排序 |
| EVD-017a Wang主文/SI与模拟实测界限 | Q1 | done | 本机Codex | 2026-11-06 | 同上；88.5%/88.1%差异保留 |

- [x] 原文和相关图页核验，2条记录/3条来源入口落库；新增独立研究仅2018一项。
- [x] 前端作者/编辑标签、原文定位与校验同步；29项测试、构建及Chrome无头定向验收通过。
- [x] [PR #13](https://github.com/SelinLee/lens-evidence-atlas/pull/13)已合并，源c192a9d；三个子任务已随GitHub Pages v0.1.8验收发布。
- [x] 旧Sites版本6曾失败；后续用户改为GitHub公开托管，全部更新已包含于Pages v0.1.8成功发布（日志13）。
- 并行Dot PR #12使用EVD-001b；本批采用001c避免复用ID，不包含其未验收数据。

## 云端组合失配增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-004d 扩芯双耦合器组合失配 | Q0 | done | dot / 本机Codex验收 | 2026-11-06 | [草稿PR #8](https://github.com/SelinLee/lens-evidence-atlas/pull/8)；本批日志07 |

来源 `he_tecf_2022`、记录 `he_tecf_combined_misalignment`。承接EVD-004/016实际装调证据缺口，不重复LBT模型。基线main ed5be7f/catalog0.1.4；本批仅一个独立论文实验点，父任务不关闭。

- [x] 直接读取原始论文HTML，组合条件逐项定位，不拼接不同MFD样品或仿真。
- [x] 光谱、分母校准与不确定性未知保留，不把设计参数变成实测；未增最佳声明。
- [x] 27/27测试、构建、逐文件重复构建哈希与查询DOM回归通过；不替代浏览器视觉验收。
- [x] 已提交[草稿PR #8](https://github.com/SelinLee/lens-evidence-atlas/pull/8)，科学提交0c182cd；CI结果以PR当前HEAD检查为准。
- [x] 本机补PDF pp.5/15/16科学审核和Chrome实际搜索/弹窗/来源页验收；见[核验笔记](TECF_REVIEW_2026-11-06.md)。保留云端旧记录的真实边界，整合后为0.1.6。
- [x] PR #8验收合并；v0.1.6私有发布成功，源提交d5bdb8a。仅关闭该工作点的子任务，父任务剩余验收继续保留。

## 云端低NA成像子任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-001b 低NA计算显微任务与原图/重建边界 | Q0 | done | dot / 本机Codex验收 | 2026-11-06 | [PR #12](https://github.com/SelinLee/lens-evidence-atlas/pull/12)；[核验笔记](CHU_META_FP_REVIEW_2026-11-06.md) |

承接EVD-001的系统级成像缺口，使用既有app_04入口，不新建应用或规定统一低NA阈值。Chu等论文作者称原系统低NA；本轮不将几何估算当实测NA。
- [x] 来源、7项参数、原文定位与处理边界落库；只计一个系统实验，未将原图/重建计作两个独立来源。
- [x] 保留带宽、物方NA、介质、实际视场/MTF、判读阈值、统计与SI缺口；不新增排序或最佳。
- [x] 30/30测试、构建、查询内容与筛选回归通过；DOM夹具不替代真实浏览器验收。
- [x] 已推送科学提交aa72e7e并创建草稿PR #12；远程树与本地测试树一致。CI以PR最新HEAD为准，不将前一提交检查冒充最终检查。
- [x] 本机补原文HTML核验和采集/迭代时间、对比度条件；整合main已有成像资料，目录0.1.8共67记录/87来源；32项测试、构建通过。
- [x] 本机独立Chrome无头验收真实搜索、九参数弹窗/关闭、来源页和已有作者比较保留，截图可读。
- [x] PR #12最新头98d2074通过CI并合并，源f5bf0db；本机验收完成。
- [x] 旧Sites版本7曾失败；用户授权公开GitHub托管后，Pages v0.1.8成功部署并完成实际网页验收（日志13）。
父任务EVD-001仍未满足多个同条件独立系统样本和完整任务范围验收，不关闭。

## 本机阵列增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-003b Liu独立阵列光学样本 | Q0 | done | 本机Codex | 2026-11-06 | codex/mla-uniformity-evidence；[核验笔记](MLA_LIU_REVIEW_2026-11-06.md) |
| EVD-016b Liu图示制备尺寸传递 | Q1 | done | 本机Codex | 2026-11-06 | 同上；不代表统计容差验收 |

- [x] 主文及SI相关正文/图页核验；独立性按研究团队计数。
- [x] 两条记录实际落库，未明定义、样品对应与统计不确定性保留。
- [x] 24项测试、构建、差异检查通过；独立Chrome无头核对app_14/best整页截图与DOM，两条记录可见。
- [x] [PR #9](https://github.com/SelinLee/lens-evidence-atlas/pull/9)已合并；v0.1.5私有发布成功，源提交d523409。两个子任务仅关闭其限定范围。
- 父任务EVD-003/016仍未满足完整定义、串扰、跨批次统计和同条件比较的要求。

## 本机LBT增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-004c LBT独立在天注入片段 | Q0 | done | 本机Codex | 2026-11-06 | [核验笔记](LBT_COUPLING_REVIEW_2026-11-06.md) |
| EVD-016a LBT单误差模型边界 | Q1 | done | 本机Codex | 2026-11-06 | 同上；不代表实测容差任务完成 |

- [x] 原文定位功率分母、波段、时间窗；视觉核对PDF pp.4/5/9。
- [x] 实测与模型分开落库，共增一个来源；保留统计窗口及组合误差缺口。
- [x] 24项测试、构建和差异检查通过。
- [x] 独立Chrome无头会话核对app_22/best渲染及长页截图；模型/实测标签和条件明确。
- [x] [PR #6](https://github.com/SelinLee/lens-evidence-atlas/pull/6)已合并；v0.1.4私有部署成功，源提交89d4b9a。父任务继续保留未满足项。

## 任务验收条件

### 本机增量任务

| ID / 任务 | 队列 | 状态 | 负责人 | 更新日期 | 依赖 | 产物 |
| --- | --- | --- | --- | --- | --- | --- |
| EVD-014b 模式接收理论界限 | Q0 | done | 本机 Codex | 2026-11-06 | PR #3 中的论文来源 | [增量核验](COUPLING_BOUND_REVIEW_2026-11-06.md) / [PR #4](https://github.com/SelinLee/lens-evidence-atlas/pull/4) |
| EVD-004b 耦合公式与功率参考面 | Q0 | done | 本机 Codex | 2026-11-06 | EVD-014b | 同上；不是独立实验样本 |

- [x] 实际核读Ansys定义正文和Jovanovic §2.1–2.4、Eq.(1)、Table 1；原有图页读取记录与本轮HTML增量分开。
- [x] 将公式、量纲、归一化上限和损耗边界落入指标/界限数据；没有建立新纪录或计作新独立样本。
- [x] 19项测试、构建及Chrome定向页面检查通过；未作全站/移动端交互验收。
- [x] PR #4已验收合并（2026-11-06）；本次仅关闭子任务。
- [x] v0.1.3已私有发布：Sites版本2，源提交eb368c5；详见研究日志05批。

### EVD-001

**低 NA 微成像：先明确任务，再补独立样本。** 基线没有独立的“低 NA 微成像”应用 ID；当前相邻入口是 [app_04](../data/applications/app_04.json)、[app_14](../data/applications/app_14.json) 和 [app_02](../data/applications/app_02.json)。

- [ ] 明确目标波段、NA 范围的文献/项目依据、成像共轭与尺度，说明归入现有应用或拆分子任务的理由；不任意定义行业统一的“低 NA”界线。
- [ ] 建立至少两个独立来源的相关性能样本，区分商业标称、科研实验和模拟；成像与单纯聚焦分别记录。
- [ ] 为分辨率/MTF、视场、通光或聚焦效率、焦移的实际适用项补原文依据，说明不能直接比较的条件和剩余缺口。

### EVD-002

**光片照明：拆开照明指标与系统成像性能。** [app_25](../data/applications/app_25.json) 现有 `ls_illum`、`ls_detection` 来自同一商业系统，另有 `ls_meta` 科研示例；不能将三个条目视为三个独立系统。

- [ ] 复核光片厚度、有效长度、旁瓣/背景与检测分辨率的定义，逐项记录宽度口径、介质、波长、照明/检测 NA、处理算法和原文位置。
- [ ] 为一个明确照明子任务取得至少两个独立来源的实验样本；说明可比字段与不可比项，不把系统 PSF 当作照明光片厚度。
- [ ] 补效率分母、积分范围及未报告项；论文内部出现不同数值时保留定位和解释，不能拼成一个“最佳规格”。

### EVD-003

**微透镜阵列：补阵列自身的评价证据。** [app_14](../data/applications/app_14.json) 的优先级引用消色差透镜示例；现有 `mla_product` 和两个 Richards 变体不能直接支撑完整阵列的重要性排序。

- [ ] 按光场成像/照明整形等具体任务核实节距、填充率、焦距一致性、串扰和波前等候选指标，新增定义均绑定正式来源。
- [ ] 增补至少两个独立来源的阵列样本，标明阵列尺寸、单元口径/节距、填充率定义及一致性测量方法。
- [ ] 复核单透镜证据能否迁移到阵列；必要时收窄现有优先级或标记未建立，不能把同文两个变体当独立团队。

### EVD-004

**单模光纤耦合：补实际耦合性能。** [app_22](../data/applications/app_22.json) 的 `fiber1550` 与 `fiber1550_compact` 同属一个厂商；现有几何规格不能代替实际插损或耦合效率。

- [ ] 增补至少两个独立来源的耦合性能样本，至少一个来自原始实验研究，明确纤型、模场、波长、偏振、对准与测量边界。
- [ ] 区分复振幅模式重叠、含传输损耗的总耦合效率、插损与回损；公式、参考面和效率分母逐项可追溯。
- [ ] 整理横向/轴向/角度失配的实际容差证据；未测或未给出的项目保留未知，不能用理想 100% 替代实测。

### EVD-005

**机器视觉：建立任务级指标依据。** [app_02](../data/applications/app_02.json) 的两个产品样本同属 Edmund，排序尚未建立。

- [ ] 分开缺陷检测与尺寸测量任务，找到 MTF/空间频率、畸变、工作距离、视场等实际适用项的原文依据。
- [ ] 增补独立厂商或研究团队样本，说明传感器采样、倍率、照明与工作距离；典型范围须给样本集合，不能把单型号当行业门槛。

### EVD-006

**远心测量：从镜头规格连接到测量误差。** 入口：[app_03](../data/applications/app_03.json)，基线仅一个记录。

- [ ] 核对物方/像方远心、畸变、倍率随深度变化、景深和测量不确定性的定义及条件。
- [ ] 补独立样本与任务级依据，区分镜头自身规格、标定后误差和整机精度，不建立无条件精度榜。

### EVD-007

**显微物镜：按介质、倍率和用途配对。** 入口：[app_04](../data/applications/app_04.json)，已有四个代表记录。

- [ ] 按 EVD-001 确定的边界处理微成像交集，复核介质、NA、倍率、工作距离、盖玻片及视场条件。
- [ ] 补分辨率/MTF、平场和轴横向色差的适用依据；分开普通成像、荧光与特殊波段，给可比样本组或明确不能配对的原因。

### EVD-008

**OCT：区分轴向分辨率、横向聚焦和系统性能。** 入口：[app_23](../data/applications/app_23.json)，基线仅一个记录。

- [ ] 复核带宽/谱形、介质折射率、轴横向分辨率、焦深及色散补偿口径；说明哪些是镜头指标，哪些属于系统。
- [ ] 增补独立实验或商业样本与原始文献依据，记录测量定义，不能把单个轴向分辨率数字归因于镜头 NA。

### EVD-009

**近红外感知：按接收成像与主动照明任务补证。** 入口：[app_08](../data/applications/app_08.json)，排序尚未建立。

- [ ] 明确应用波段与任务，分别核实像质、效率、视场、偏振或入射角等相关约束。
- [ ] 补独立样本并区分元件、模组、系统指标；厂商页面与实测论文分别标注，无法核验的宣传值不作为最佳水平。

### EVD-010

**复核现有 7 类编辑性优先级。** 范围：`app_03/04/14/22/23/25/32`。

- [ ] 对每个 tier/指标写出“具体任务—理由—原文位置—推理边界”的核对结果；证据只支持指标相关性时，不擅自升级为顺序依据。
- [ ] 支撑不足的层次改为并列、收窄任务范围或 `not_established`；只有原文明示时才采用 `author_explicit` 并附 `explicit_rank_location`。
- [ ] 在日志中逐项列出保留/修改/降级及对应数据提交。不存在原文明示排序本身不是必须消除的缺陷。

### EVD-011

**逐项处理其余 26 类排序缺口。** 范围见下方覆盖表；先完成重点应用，再按任务价值拆分子任务。

- [ ] 每个应用至少形成一个明确子任务与指标证据表，标注原文排序、编辑整理或未建立。
- [ ] 对没有统一顺序的情况给出权衡关系和出处；检索无结果则保存路径及待补项，不填猜测名次或统一合格分数。

### EVD-012

**补充尚未覆盖的专业指标定义。** 基线 [指标目录](../data/metrics/) 有 20 项，最新计数见README，路线图提出 NETD、PPD、像面主光线角、可靠性/工艺容差等候选。

- [ ] 先按具体应用选取需要的定义，记录单位、公式或测量方法、优劣方向、条件及出处；不能仅为扩大词典而添加无应用指标。
- [ ] 区分系统与元件量；补充分辨率、噪声、温度、视场或采样条件等必要限定。新 ID 同步应用映射、数据契约与网页展示。

### EVD-013

**完善样本比较条件。** 审计入口：[性能记录目录](../data/benchmarks/)，先处理首批四个应用，再扩展至全部记录。

- [ ] 建立逐记录缺项表：波长/带宽、NA/孔径、介质/瞳形、共轭、偏振、视场/频率、焦面、效率分母/积分范围、算法与实验/模拟性质。
- [ ] 对每个必要字段标明已核验、未报告、未读到或不适用及理由；非适用字段不机械要求补数，未知不能作通配符。
- [ ] 补充单位换算和定义差异的出处，明确哪些样本可以比较；首批验收只关闭对应子任务，不宣称所有 55 条均已复核。

### EVD-014

**复核两项限定范围最佳/界限。** 入口：[scoped_bests.json](../data/scoped_bests.json)。

- [x] `richards_author_best`：核对 10 个样本、逐波长最佳与均值、实验条件、空白基底参考及积分圈口径，绑定方法段和图表。
- [x] `fiber_ideal_bound`：核对归一化复振幅重叠的假设和损耗边界，保持理论界限标签，不作实测最高值。
- [x] 保留或纠正结论均记录证据及范围；不得因复核完成升级为全球或本库最佳。

2026-11-07完成审计：两项分别由已合并PR #3 / #4落实，当前公开v0.1.29仍保留限定范围；见[证据与验收映射](SCOPED_BESTS_COMPLETION_AUDIT_2026-11-07.md)。仅关闭本任务，不代表EVD-003 / 004独立样本、同条件比较和容差要求完成。

### EVD-015

**标准版本与适用条款。** 入口：[standards.json](../data/standards.json) 及来源条目。

- [ ] 逐项核对标准编号、版次、现行/替代关系、地区和适用对象，区分测试方法标准与含性能门槛的标准。
- [ ] 声称要求或阈值时定位到实际读到的条款；仅读目录则明确边界。付费/权限阻碍记入日志，继续处理可获取项，不上传无再分发授权全文。

### EVD-016

**工艺、容差与测量不确定性。** 先服务 EVD-001–004，再逐应用扩展。

- [ ] 为相关样本提取实际工艺、几何限制、材料/波段、制造偏差、装调容差和不确定性；把设计容差仿真与实物成品证据分开。
- [ ] 保留失败、退化或良率资料的分母及测试范围；无法取得时显式记录，不凭单次演示认定量产可制备。

### EVD-017

**来源读取范围和引用定位复核。** 入口：[来源目录](../data/sources/)。

- [ ] 将关键结论关联到标题、作者/机构、年份、DOI/原始链接、版本、公式/图表/页码及读取范围；优先处理摘要/索引支撑的关键主张。
- [ ] 实际取得新内容后才提升核验状态，页面 403/429 仅记录访问情况；保存冲突来源和更正原因，不批量刷新旧核验日期。

### EVD-018

**建立条件化比较集合。** 依赖相应应用样本及 EVD-013 的比较条件整理。

- [ ] 为一个具体任务写明候选 ID、独立来源、检索截止日、纳入排除规则、共同条件及比较协议。
- [ ] 至少两个合格候选且口径一致后才讨论 `corpus_best`；不足时保留比较表与缺口，不生成排名。
- [ ] 如需扩展结构，同步 schema、校验、必要测试与前端，并记录兼容性；不得跨任务、跨测量口径排序。

## 首批局部交付与审核条件

共同分支：`evidence/2026-11-06-priority-batch-1`；科学数据提交 [`8665352`](https://github.com/SelinLee/lens-evidence-atlas/commit/86653527ef4b818501d54e3c6621fbea19bba7a1)，关联 [Issue #1](https://github.com/SelinLee/lens-evidence-atlas/issues/1) / [PR #3](https://github.com/SelinLee/lens-evidence-atlas/pull/3)。过程及读取范围见 [2026-11-06-02 日志](RESEARCH_LOG.md)。这些子任务已通过PR #3合并并随v0.1.3私有发布；父任务未满足的验收继续保留。

### EVD-001a

**范围：收录一个 Wang 2021 低 NA 元件聚焦实验，不声称完成微成像应用。** 数据 `wang_low_na_achromat`、来源 `wang_low_na_2021`，暂放 app_04 候选元件，不定义行业统一低 NA 边界。

- [x] NA0.1、650–1000 nm 平均88.5%及两个谱点值绑定主文 HTML 位置；同孔径入射分母、半径3×FWHM焦圈明确。
- [x] 元件/完整成像系统分开，样本数和逐波长焦面未核验，PDF/SI未读；与Richards的分母不同，不排名。
- [x] PR #3已审核并合并；父任务仍需第二独立来源与明确成像任务。

### EVD-002a

**范围：Luo 2025 单篇研究的照明和系统测量分开。** 数据 `ls_meta`、`ls_system_psf`，共同来源 `lightsheet_meta`；不计作两个独立来源。

- [x] 532 nm照明FWHM6.8 μm与系统横向PSF约1.7 μm分开，记录照明NA0.05、检测NA0.3、1 μm珠和0.5 μm步长。
- [x] 44.3%仅保留作者报告的透过效率名称；分母未核，文内1.1/1.7 μm、800/850 nm差异保留；SI/原图未读。
- [x] PR #3已审核并合并；父任务仍需差异消歧、完整测量定义及独立可比来源。

### EVD-004a

**范围：一个原始实验的单模注入结果。** 数据 `scexao_smf_lab`、来源 `jovanovic_smf_2017`。

- [x] 实际查看arXiv v2 pp.8、12–13图页；记录约78%@1500/1550 nm、纤型/MFD和365 μm MMF参考分母，排除端面Fresnel反射。
- [x] 86%相对91%理论值不是绝对耦合率，f/5.3模型估计未直接验证，不记实测NA；未知偏振/对准与端到端边界保留。
- [x] PR #3已审核并合并；父任务仍需独立同条件实验及实际失配容差。

### EVD-013a

**范围：本批逐参数出处和机器校验防线，不宣称全库条件已补齐。** 相关数据、schema、校验脚本、测试与前端同步。

- [x] 新核验参数来源定位、核验状态枚举、应用/记录双向关联；未知及空条件不能比较。
- [x] 本库最优候选存在/唯一性/应用、指标必需条件、截止日、选中参数及显示值检查；19项测试与构建通过。
- [x] 本地四目标应用、出处与搜索筛选实测；无新增无范围最优，人工仍须判断科学可比性与数值优劣。
- [x] PR #3已审核并合并；父任务的全库缺项表与EVD-018真实比较集合仍待做。

### EVD-014a

**范围：Richards 主方案与论文内最佳，不替代阵列自身指标证据。** 数据 `richards_main`、`richards_author_best`，来源 `richards`。

- [x] 实际查看出版社PDF印刷pp.3–5、7–9；10样本均值/最佳范围、实验空白基底分母和3×FWHM焦圈定位。
- [x] 仿真200×200 μm焦面功率分母另列；约2.8%为四离散谱点相对542 nm的报告，固定共同焦面未证明、SI未读。
- [x] PR #3已审核并合并；EVD-014理论界限原文复核和EVD-003独立阵列、串扰/均匀性等任务仍待做。

### EVD-003a

**范围：一个独立团队的六角阵列几何样本，不代表EVD-003全部验收。** 来源 `zhang_inkjet_mla_2022`、记录 `zhang_hex_mla`、定义 `array_fill_factor`；沿用 `evidence/2026-11-06-priority-batch-1`。

- [x] 原始出版社HTML定位半径、中心距与面积比，定义区分几何填充率与光学效率。
- [x] 不拼接不同样品系列；保留完整阵列尺寸、统计边界、串扰和SI未核验。
- [x] 收窄既有单透镜编辑层次，不扩成阵列整体排名。
- [x] 测试/构建与查询逻辑单元回归通过；提交草稿审核。
- [x] 本机独立Chrome无头会话补验指标页截图及best/sources/priority渲染内容；未做移动端或全站点击回归。父任务仍缺第二个明确阵列实验与一致性/串扰证据。
- [x] PR #3已审核合并，并随v0.1.3私有发布；父任务未完成。

## 33 类应用覆盖快照

以下“记录/指标”是初始化时的条目数，不是独立来源数或完成率。`编辑` = `editorial_synthesis`；`未建立` = `not_established`。相关任务处理后，日志记录变化；不要误把这份历史表当实时进度。

| 应用 ID | 应用 | 记录 | 指标 | 排序基线 | 对应任务 |
| --- | --- | ---: | ---: | --- | --- |
| app_01 | 手机摄影 | 3 | 5 | 未建立 | EVD-011 |
| app_02 | 工业与机器视觉 | 2 | 4 | 未建立 | EVD-005 / 011 |
| app_03 | 远心精密测量 | 1 | 5 | 编辑 | EVD-006 / 010 |
| app_04 | 显微镜物镜 | 4 | 5 | 编辑 | EVD-001 / 007 / 010 |
| app_05 | 一次性微型内窥摄像 | 1 | 4 | 未建立 | EVD-011 |
| app_06 | 白光宏观内窥观察 | 1 | 4 | 未建立 | EVD-011 |
| app_07 | 显微与扫描内窥 | 2 | 4 | 未建立 | EVD-011 |
| app_08 | 近红外感知与生物识别 | 2 | 4 | 未建立 | EVD-009 / 011 |
| app_09 | 短波红外检测 | 1 | 4 | 未建立 | EVD-011 |
| app_10 | 长波红外热成像 | 2 | 4 | 未建立 | EVD-011 |
| app_11 | 折射式天文摄影 | 1 | 4 | 未建立 | EVD-011 |
| app_12 | 激光聚焦与耦合 | 1 | 4 | 未建立 | EVD-011 |
| app_13 | 近眼显示 | 3 | 5 | 未建立 | EVD-011 |
| app_14 | 微透镜阵列与光场 | 3 | 5 | 编辑 | EVD-003 / 010 |
| app_15 | 色散共焦与光谱编码测量 | 1 | 4 | 未建立 | EVD-011 |
| app_16 | 全画幅摄影与视频 | 1 | 4 | 未建立 | EVD-011 |
| app_17 | 投影显示 | 1 | 4 | 未建立 | EVD-011 |
| app_18 | 车载前视成像 | 1 | 4 | 未建立 | EVD-011 |
| app_19 | 激光雷达与三维测距 | 2 | 3 | 未建立 | EVD-011 |
| app_20 | 激光扫描加工 | 2 | 4 | 未建立 | EVD-011 |
| app_21 | 深紫外光刻投影 | 1 | 4 | 未建立 | EVD-011 |
| app_22 | 单模光纤准直与通信耦合 | 2 | 4 | 编辑 | EVD-004 / 010 |
| app_23 | OCT与低相干断层成像 | 1 | 5 | 编辑 | EVD-008 / 010 |
| app_24 | 多光子深组织显微 | 2 | 4 | 未建立 | EVD-011 |
| app_25 | 光片照明与体积显微 | 3 | 5 | 编辑 | EVD-002 / 010 |
| app_26 | 量子原子光镊与精密操控 | 1 | 4 | 未建立 | EVD-011 |
| app_27 | 光谱仪与拉曼收集成像 | 2 | 3 | 未建立 | EVD-011 |
| app_28 | 高光谱分选与遥感 | 2 | 4 | 未建立 | EVD-011 |
| app_29 | 空间巡天与精密测光 | 1 | 4 | 未建立 | EVD-011 |
| app_30 | 眼镜片视力矫正 | 1 | 3 | 未建立 | EVD-011 |
| app_31 | 隐形眼镜 | 1 | 2 | 未建立 | EVD-011 |
| app_32 | 人工晶状体 | 2 | 2 | 编辑 | EVD-010 |
| app_33 | 中波红外制冷成像 | 1 | 4 | 未建立 | EVD-011 |

## 新任务模板

复制任务正文并在工作队列增加一行；新 ID 永不复用。

```text
ID / 标题：EVD-019 / …
队列、状态、负责人、更新日期：
应用 / 指标 / 来源 / 记录 ID：
基线版本与具体缺口：
研究问题与适用边界：
依赖 / 已有工作 / 下一步：
验收条件：
- [ ] 证据和定位满足……
- [ ] 数据与展示更新……
产物 / Issue / PR / 合并提交：
日志入口：
网页部署状态与版本（如适用）：
受阻原因 / 重开条件（如适用）：
```


## 云端阵列间距统计增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-003c 阵列质心间距CV与统计复算 | Q0 | done | dot / 本机Codex验收 | 2026-11-06 | [草稿PR #20](https://github.com/SelinLee/lens-evidence-atlas/pull/20)；[核验笔记](MLAG_SPACING_REVIEW_2026-11-06.md) |

基线main 531e04d / 0.1.9。开放PR #19处理光片含能量定义，本批不混入其未合并数据，不改63%/67%边界。认领阵列统计子任务；不关闭EVD-003父任务。

- [x] 原始§3.2、Table 1与Fig.4实际核读；定义/来源/独立实验增量已落库。
- [x] 作者CV、表内复算差异、波长归属及统计缺口保留；未增加最佳/排名。
- [x] 38项测试、构建、语法、diff及DOM查询回归通过。
- [x] 云端旧预览连接失败；本机独立Chrome无头完成桌面/390 px视口的真实查询、定义、弹窗、出处链接和关闭验收。
- [x] 科学提交a95d20f已推送并创建草稿PR #20；远程树与本地测试树完全一致。
- [x] 最终头a28f0ee的CI运行42222161654通过；PR #20科学与展示验收后已合并，源3bc5595。
- [x] 已保留main全部光片更新与63%/67%边界，重建0.1.15，45项测试通过。
- [x] Pages运行42222262843成功，公开HTTPS目录实际0.1.15；本机独立Chrome无头桌面/手机视口定向交互与截图验收通过（日志20）。
详见[核验笔记](MLAG_SPACING_REVIEW_2026-11-06.md)与研究日志16。

本机EVD-003c验收补记：已直接核对PMC表格/图像及数据可用性声明，45项测试/构建通过；Chrome独立无头桌面和390 px视口核对定义、七参数弹窗、出处链接、搜索/清空、关闭及光片旧记录保留。整合候选0.1.15，最终头CI/合并/Pages已验收，详见日志20。


## 云端单接口插损增量任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-004e LEOF五样品双向插损与工作间距 | Q0 | done | dot / 本机Codex审核 | 2026-11-06 | [PR #21](https://github.com/SelinLee/lens-evidence-atlas/pull/21)；[核验笔记](LEOF_LOSS_REVIEW_2026-11-06.md) |

基线main 531e04d / 0.1.9，开放草稿PR #19/#20分别处理光片定义与阵列CV，不重复或混入。EVD-004/016父任务不关闭。

- [x] 原始PDF p.6公式、pp.9–12测量和图内间距实际核验；定义与单接口记录落库。
- [x] 区分dB/线性平均、接触/优化、TX/RX、五件样品/重复次数和理论/实测；保留图文聚合、校准及实验容差缺口。
- [x] 38项测试、构建、语法/diff与DOM回归通过；独立原始PDF和数据复核无阻断。
- [x] 云端旧预览返回ERR_CONNECTION_REFUSED；本机整合后独立Chrome无头已验收桌面/390 px视口的真实查询、九参数弹窗、定义、来源与关闭。
- [x] 科学提交64ebc13已推送并创建草稿PR #21，远程树与本地测试树完全相同。
- [x] 最终头36fee53的CI运行42223776001成功；科学与真实展示审核通过，PR #21已合并为ba22395。
- [x] 本机整合保留#19/#20及main 000f2a0全部增量，重建v0.1.16并通过48项测试；实际Pages已成功发布并完成线上验收。

本机接续EVD-004e：分支codex/leof-coupling-review，从PR #21合入main 000f2a0；实际渲染出版社PDF公式与图页，补设备/纤型记法及数据可用性边界，详见核验笔记第5节。保留父任务与原始聚合/校准缺口；最终CI与合并已验收，Pages运行42223885791成功；公开HTTPS实际v0.1.16，并通过独立Chrome无头桌面/手机视口定向验收。详见日志21。

- [x] EVD-004e局部交付完成：Pages 42223885791成功，数据指纹与本机构建一致；不关闭EVD-004/016父任务，原始统计与实验校准缺口继续保留。


## 云端FPM分辨率口径子任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 |
| --- | --- | --- | --- | --- | --- |
| EVD-001d 独立FPM实验与半周期勘误 | Q0 | done | dot / 本机Codex审核 | 2026-11-06 | [PR #22](https://github.com/SelinLee/lens-evidence-atlas/pull/22)；[核验笔记](ZHENG_FPM_REVIEW_2026-11-06.md) |

基线main531e04d/v0.1.9；开放草稿#19/#20/#21不混入；EVD-001/013父任务保持开放。
- [x] 原始修订PDF与末页勘误核验；逐参数位置、来源独立性和处理条件落库。
- [x] 保留半/整周期、像元/分辨率、物理/合成NA、方向/曝光和视场复现边界。
- [x] 38项测试、构建、定义/引用/搜索/重复弹窗DOM回归通过。
- [x] 云端旧候选Chromium未能启动；本机整合后独立Chrome无头完成桌面/390 px视口的搜索、十一参数弹窗/滚动/关闭、两项定义、三来源入口及原文限定优先关系保留验收。
- [x] 科学提交b18f7f1已推送，远程树与本地最终测试树一致，草稿PR #22已创建。
- [x] 最终头a811dbd的CI运行42225357892通过；科学与真实本地展示审核完成。
- [x] PR #22已合并为7094401；保留main全部增量，重建v0.1.17。Pages运行42225439198成功，实际HTTPS v0.1.17已验收。

本机接续EVD-001d：分支codex/fpm-correction-review，整合main 4f39ded；补读2015修订SI相关图页，增加复场采样、视场直径标签与离焦剖面，并保留采样限/SBP复算差异。未将选定场图当全场保证；父任务继续开放。

- [x] 本机补核出版社修订SI PDF pp.1/3/6/10/11，更新历史未读边界；51项测试、构建及diff检查通过，候选v0.1.17。最终头CI、合并与Pages均已验收，详见日志22。


## 首批四方向验收盘点（主线7094401 / v0.1.17）

本表是对已入库证据及仍缺项目的维护核对，不是本日重读所有文献。父任务改为`in_progress`以反映已有多批局部交付；保留原验收条款，不因来源数增加将整项标done。

| 父任务 | 已入库且可追溯的部分 | 尚不能据此宣称完成的部分 | 下一项明确行动 |
| --- | --- | --- | --- |
| EVD-001 低NA微成像 | app_04的Wang、Chu、Zheng记录分别标明光谱、物理NA、成像/聚焦/计算处理，FPM勘误及选定场位置已核 | 跨记录MTF/视场/效率协议不一致；原始数据、部分光路与图页尚缺；不存在通用低NA分界或整套指标顺序 | 用现有记录建立逐字段条件/缺口表，区分可对照与不能排名的原因；不继续以同论文变体凑独立样本 |
| EVD-002 光片 | app_25区分主峰厚度、含能量宽度、传播范围和系统PSF；Luo/Battistella/Shi实验及Shi任务权衡可查 | Luo效率分母和数值差异、Remacha比例差异仍未消歧；未建立同协议含能量宽度/有效长度集合 | 明确一个共同测量协议后筛选候选；未知量不按零或可忽略处理 |
| EVD-003 微透镜阵列 | app_14的喷墨、润湿、MLAG记录及填充率/质心间距CV定义；Richards排序已限于单透镜 | 定量串扰、逐单元焦距分布/波前和完整任务级依据仍缺；强度统计与空间间距CV不等价 | EVD-010c先复核单透镜P1/P2是否还有证据支持，再补具体阵列任务的可测指标 |
| EVD-004 单模耦合 | app_22的Subaru/LBT/TECF/LEOF记录，模式重叠与总效率、插损定义分开；单轴模型/组合实验/优化工作点不混用 | 回损尚无定义；实验校准面、偏振、独立单轴容差/统计仍不齐；LEOF聚合未复现 | EVD-010c先核任务层次依据，再优先补回损与已有实验的参考面/容差边界 |

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 产物 / 下一步 |
| --- | --- | --- | --- | --- | --- |
| EVD-010c 首批阵列/单模耦合剩余编辑层次复核 | Q0 | done | 本机Codex | 2026-11-06 | app_14/app_22；逐项查明P1/P2理由是否有任务约束与可定位原文，必要时改为有出处的权衡；不能只改标签而保留无依据次序 |

EVD-010c验收：每条层次均有具体任务、来源位置和推理边界；只支持相关性时保留并列/未建立，不把编辑判断升级为作者名次。落库后同步校验/真实网页、PR与部署。完成首批复核后推进EVD-005/006缺陷检测与尺寸测量，不等待所有原始论文争议被完全解决才进入第二优先领域。

EVD-010c本机审核：已逐条复核Richards pp.6–8和Jovanovic pp.5–7；原文支持条件取舍，不支持旧P1/P2。两页改为有引用的任务权衡；52项测试、构建及独立Chrome无头桌面/390 px来源、筛选与记录保留检查通过。候选v0.1.18，PR/部署状态见日志23；父任务保持开放。

## 第二优先领域的下批具体任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收重点 |
| --- | --- | --- | --- | --- | --- |
| EVD-005a 缺陷检测与尺寸测量的任务证据 | Q1 | in_progress | 本机Codex | 2026-11-06 | app_02按任务解释空间频率/MTF、采样、照明、视场与几何误差；至少一项原始研究依据，明确读取范围与任务边界，不能仅扩写现有厂商规格 |
| EVD-006a 远心镜头到测量误差的证据链 | Q1 | in_progress | 本机Codex | 2026-11-06 | app_03复核旧P1/P2；定位远心方向、深度/倍率变化、标定残差及不确定性；补独立研究或厂商样本，区分镜头标称和整机测量 |

两项按EVD-005/006父任务验收，不因新子任务建立而降低或关闭父任务。优先核查现有tele_definition与mtf_definition是否直接支持旧层次，再用原始研究补任务证据；尚未读取的新论文不能入已验证数据。

EVD-010c交付完成：[PR #27](https://github.com/SelinLee/lens-evidence-atlas/pull/27)合并a91a08d，Pages运行42227252561成功，实际HTTPS v0.1.18已完成Chrome无头桌面/390 px来源与筛选验收。仅关闭本次两页旧层次复核，不关闭EVD-003/004/010父任务。

## 远心首批独立标定样本

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收范围 |
| --- | --- | --- | --- | --- | --- |
| EVD-006b Li 2015系统验证与误差口径 | Q1 | done | 本机Codex | 2026-11-06 | 原始论文与原厂预算相关段已核；12参数、2定义及app_03任务依据落库；实际测试/PR/部署状态见日志24 |

EVD-006a和EVD-006继续进行：本批仅交付三维结构光子任务及理想远心误差预算，仍缺二维独立参考工件验证、实际倍率随深度曲线、景深判据和完整可溯源测量不确定性。不把本批教材预算或论文残差变成统一合格阈值。EVD-005a的缺陷检测研究尚未完成。

EVD-006b发布验收：[PR #29](https://github.com/SelinLee/lens-evidence-atlas/pull/29)已合并99218ed，Pages42229313637成功；实际HTTPS v0.1.19经Chrome无头桌面/390 px验证。只关闭此12参数实验/2定义/旧层次修订子任务；EVD-006a/006及EVD-005a继续开放。

## 机器视觉首批缺陷图像证据

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收范围 |
| --- | --- | --- | --- | --- | --- |
| EVD-005b Ma 2026缺陷可分性与γ对照 | Q1 | done | 本机Codex | 2026-11-06 | 原始PDF公式/图表及通道边界已核，1样本/1定义/任务说明入库；测试与真实页面/PR/部署见日志25 |

EVD-005a/005仍进行中：本批能区分缺陷可见性与尺寸误差，但没有补齐指定缺陷物理尺度下的实测MTF、物方采样/WD/FOV与漏检/误报率，不将区域统计改善当检测算法验收。论文的ε/ROI计数/重复不确定性等缺口保留。

## OCT下批具体任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收范围 |
| --- | --- | --- | --- | --- | --- |
| EVD-008a OCT分辨率/焦深定义与任务依据 | Q1 | done | 本机Codex | 2026-11-06 | 核oct_definition可读原文及app_23旧P1/P2；区分轴向响应的幅度/强度宽度、空气/介质、谱形及横向光斑/焦深，补独立原始实验并与理论估算分开 |

EVD-008a不缩减父任务EVD-008要求；机器视觉与远心未满足项继续保留。NCBI当前检查页不是原文，后续可换出版社合法开放版，不因单一入口失败宣称整个任务受阻。

EVD-005b发布验收：PR #31已合并，Pages运行[42231267214](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42231267214)成功；公开HTTPS实际v0.1.20，33应用/27指标/74记录/99来源。本机独立Chrome无头桌面/390 px视口完成查询、来源/定义/样本弹窗、筛选及既有样本保留验收。仅关闭005b，005a与父任务005的检测性能缺口继续保留。

EVD-008a本批：Aumann原始书章、幅度/强度与介质口径、焦深系数冲突，以及Spaide单研究颗粒/模型/标靶样本已入库，待PR及实际站点验收。EVD-008父任务继续进行：尚缺独立轴向PSF、色散补偿实验、跨深度条件与完整不确定性；没有把现有平台3/7 μm描述升级为本轮实测。app_23排序复核也计入EVD-010的限定子项。

## 近红外下一批具体任务

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收范围 |
| --- | --- | --- | --- | --- | --- |
| EVD-009a NIR偏振接收与模块口径 | Q1 | done | Codex | 2026-11-06 | 先处理Polar ID隐藏文本TTL与可见规格差异，再核Latawiec 2025原始图页/三Stokes与帧率边界；分开照明、接收、偏振测量及最终防伪性能，补相应定义和任务依据 |

EVD-009a不缩减父任务EVD-009。2024模块外形高度不是TTL；2025器件文章未明确中心波长时不能继承2024模块的940 nm。不能将作者描述“高安全”或“高透过”升级为误识率、标准认证或定量效率。

EVD-008a发布验收：PR [#33](https://github.com/SelinLee/lens-evidence-atlas/pull/33)合并c2012aa；Pages [42233914755](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42233914755)成功，公开HTTPS实际v0.1.21，33应用/28指标/75记录/100来源。独立Chrome无头桌面/手机查询、三定义/两出处/10参数弹窗、排序筛选及既有重点样本保留通过；截图实际查看。仅关闭008a限定范围，父008及009保持缺口。


### EVD-009a 发布验收与后续任务

- [x] Polar ID可见规格复核，撤下隐藏TTL断言并区分主动照明/接收/外形。
- [x] Latawiec三通道与Li全Stokes原始证据逐项落库；3个偏振定义及任务权衡有原文定位，无新增排名。
- [x] PR [#35](https://github.com/SelinLee/lens-evidence-atlas/pull/35)，头cba90d324f912144c55fa86fe312ab8cfad045dd，CI42237461915成功，合并ef523144a1dca6a3d8629bd0185887984cefc50f。
- [x] 主线CI42237563651、Pages [42237563644](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42237563644)成功。公开HTTPS实际v0.1.22；59测试及独立Chrome无头桌面/手机查询、弹窗、来源、筛选和旧重点记录保留验收通过。

仅关闭009a限定范围。父009继续进行，特别是照明和独立PAD测试尚不完备。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-009b NIR效率、测量误差与PAD验证 | Q1 | in_progress | Codex | 2026-11-06 | 获取Li S9/S10/S11或其他独立原始实验，核效率分母/积分区域、偏振误差范数、照明条件及独立防伪协议；不可取得者保持明确未知，不能以图像距离当错误率 |
| EVD-011a 热成像NETD及测温边界 | Q2 | done | Codex | 2026-11-06 | 为app_10补原始定义/测量方法、镜头与系统边界及有条件实验样本；分开时域噪声、非均匀性、测温误差与空间分辨率，不建立无条件mK合格线 |

009b先推进可取得资料；访问困难不阻塞其他任务。011a同时服务EVD-012，候选来源仅检索命中，未将其摘要写成已核定义或指标。


009b本批已取得Li附录并核S9–S11，发现轴上外推并纠正旧逐场校准表述；16态输入、装机前效率和融合方法已落实。分母、误差范数及独立PAD统计仍缺，009b不关闭。011a已取得König 2020原始18页PDF并核NETD/SSE方法和表2/5/13，因附录发现需优先纠正NIR，热成像数据下一批落库；不计为已完成。

009b阶段发布：PR [#37](https://github.com/SelinLee/lens-evidence-atlas/pull/37)合并98c79ce；60项测试、构建及Chrome桌面/手机通过。Pages [42239950688](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42239950688)成功，实际公开v0.1.23。已取得并核S9–S11，分母/误差范数/独立PAD统计仍未满足，009b保持in_progress，父009不关闭。原文未报告部分需转向其他独立研究或原始数据，不反复把同一缺失段当检索障碍。

011a接续资料已在[热成像核验笔记](THERMAL_NETD_REVIEW_2026-11-06.md)：PTB三相机为一个实验研究，FLIR A700为一个原厂配置，分别有实测/声明边界；这两者尚未进入网页数据，先落库并验收，再关闭限定子任务。


EVD-011a候选v0.1.24：两定义、一个PTB同研究三相机记录及一个FLIR单配置、两个来源已落库；表2描述/表5实验/图8估读/表13预算分开。F数、时间带宽与实际曝光未知不补猜；温度和方法不齐不排名。待最终验证发布；后续同条件独立样本及正式标准条款仍属于父011/012/015范围。

011a实际验收：PR #39合并0adb746，62项测试及构建通过；Pages42242389147成功。公开v0.1.24数据SHA256与本地一致，独立Chrome无头桌面/390 px查询、三定义、双出处、13参数记录及既有样本保留检查通过；弹窗内部无横向溢出，截图已查看。仅关闭011a限定范围；父011/012/015及009b仍开放。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-011b SWIR成像与传感器匹配 | Q2 | in_progress | Codex | 2026-11-06 | 补app_09原始成像实验及传感器、波段、采样与工作距离条件；分开设计模拟、样机实验和原厂声明；低NA成像证据可关联EVD-001但不重复计为独立研究 |

011b认领：独立分支codex/swir-imaging-evidence，基线323a530。Dupre原始PDF图2/3及Table1已实际视觉查看；Balli主文与SI的出版方可检索文本取得，但PDF图像/原文件入口失败或空响应，尚不据图估读数字。优先补样机/模拟和成像中继条件边界。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-001e Balli低NA中继成像文字条件 | Q0 | done | Codex | 2026-11-06 | 收录200 μm/NA0.04实际成像的物距、中继、照明和相机文字条件；公开图像未核与效率口径冲突，不收未核分辨率；图像复核及同条件比较仍在父001范围 |

011b阶段候选v0.1.25已补Dupre样机/模拟、Nyquist定义及条件权衡；样机物距/实测MTF/误差等仍缺，保持in_progress。001e只对应文字证据限定交付，尚待实际发布。详见[核验笔记](SWIR_LOW_NA_REVIEW_2026-11-06.md)。

001e发布验收：PR #41合并1acb5f2；65项测试、构建和Chrome桌面/390 px通过；Pages42245329001成功，实际HTTPS v0.1.25/hash与本地一致。仅关闭该文字条件子任务，Balli图像视觉核验/效率冲突及父001、011b继续保留。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-004f 单模耦合回损与反射参考面 | Q0 | done | Codex | 2026-11-06 | 补回损/反射率符号和功率定义、参考面与测量方法；核一个原始实验并区分插损、模式重耦合及总反射，保留仪器动态范围/误差；不能用链路标准阈值直接充当微透镜要求 |

004f认领：基线8fe1c28，独立分支codex/fiber-return-loss；先视觉核Chanclou作者稿并取得正式功率定义，避免负反射dB与正回损混淆。

004f候选v0.1.26：回损定义、Chanclou端面事件实验及G.671连接器条件化限值已落库，原文图表/例外已视觉核。仪器范围/accuracy、负反射值与正回损、器件/整链路边界分开。待测试及实际发布；父004仍缺同条件独立样本、同件前向插损与完整公差。详见[核验笔记](FIBER_RETURN_LOSS_REVIEW_2026-11-06.md)。

004f发布验收：PR [#43](https://github.com/SelinLee/lens-evidence-atlas/pull/43)合并709225e；68项测试、构建及Pages[42247400387](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42247400387)成功。实际HTTPS v0.1.26及数据SHA256与本地一致；独立Chrome无头桌面/390 px查询、三定义/三出处、9/5参数样本、排序筛选及旧记录保留通过，截图已查看，无横向溢出。仅关闭004f限定交付，父004保持开放。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-003d 多通道阵列串扰口径与对照实验 | Q0 | done | Codex | 2026-11-07 | 核邻道/主通道的分母、ROI背景扣除及实验/模拟边界；先核Katopodis 2025公式与数值倒数冲突，不据未经消歧的CT做排名；不替代逐单元焦距/波前及跨批次统计 |

003d入口：DOI 10.1117/1.JBO.30.12.126006，Europe PMC原始XML取得，§Validation Eq.(4)为I_neigh/I_prim，而正文1.035/19.83对应所报均值的倒数。尚待出版页面/关键图视觉核验；未作为已验证样本落库。

003d候选v0.1.27（2026-11-07）：原始XML MathML方向已核，正文图件已查看；14参数样本、邻道串扰定义和瞬时/拼接FOV条件落库，明确CT倒数冲突、出版PDF未取得及原始数据/误差缺口。待测试、真实Chrome与发布验收；只处理公开报告与算术复核，不关闭父003。详见[核验笔记](MLA_CROSSTALK_REVIEW_2026-11-07.md)。

003d发布验收：PR [#45](https://github.com/SelinLee/lens-evidence-atlas/pull/45)合并96fcd81；71测试和构建通过，Pages[42249814889](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42249814889)成功，公开HTTPS实际v0.1.27及数据SHA256与本地一致。独立Chrome无头桌面/390 px查询、三定义、两出处、14参数弹窗、排序过滤及旧记录保留通过；截图已查看。只关闭公开报告/定义/算术核验的限定交付；倒数冲突原因、原始数据/曝光误差及父003的独立同协议对照、焦距/波前与跨批次统计仍开放。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-003e 计算阵列成像的分辨率与处理时间 | Q0 | done | Codex | 2026-11-07 | 核独立团队单次曝光/重建的视场、分辨率、轴向容许范围、采样与处理时间；原始光学与算法分开，实际采集和推理延迟分开，不充当同协议串扰比或世界最佳 |

003e认领：基线c47318e，分支codex/mla-fluorescence-throughput。Orth全文入口暂不可读，保留线索；已取得Yang等2024 arXiv:2403.06439v2作者稿（含SI，共51页），正式发表DOI10.1364/OPTICA.523636。仅取本文实测/计算重建子任务，不以算法解复用代替003d的光学泄漏比；待关键图页与条件核验。

003e候选v0.1.28：作者v2关键PDF图表已视觉核验，新增一个15参数研究样本、重建时间/轴向可用范围两定义和任务权衡；NA估计、标靶重建、模拟PSD与参考物镜分开。约0.06 s不当帧率，100 μm不当轴向分辨率，公开边缘对比度下降与计时协议缺口。详见[核验笔记](SVFOURIER_REVIEW_2026-11-07.md)。待测试、Chrome及实际发布；父003仍开放。

003e发布验收：PR [#47](https://github.com/SelinLee/lens-evidence-atlas/pull/47)合并19d5419；72项测试、构建及Pages[42253635380](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42253635380)成功。实际HTTPS v0.1.28及数据SHA256与本地一致；独立Chrome无头桌面/390 px查询、三定义/两出处、15参数弹窗滚动开关、排序筛选及旧样本保留通过，截图已看。仅关闭作者报告/条件边界核验的限定范围；无同协议跨团队最优、端到端帧率或焦距/波前公差验收。下一步优先逐单元焦距测量与不确定性，已取得朱等2013七页原始PDF，尚未读正文；入口和ISO2024目录预核边界见日志33。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-003f 阵列逐单元焦距测量与不确定性 | Q0 | done | Codex | 2026-11-07 | 核原始测量模型、焦面/参考面、单元样本与不确定度；不将测量精度当焦距均匀性或制造公差，不据方法论文设通用合格阈值 |

003f认领：基线91c3a0d，独立分支codex/mla-focal-length-evidence，先读朱等2013原始7页PDF；文本字体编码损坏，须逐页图像核验，不能依赖提取乱码。

003f候选v0.1.29：已逐页核朱等7页PDF，增加13参数记录和焦距/焦距CV/测量不确定度三定义；NIST与GUM支撑统计与覆盖解释。公开U_s正文/表格10倍冲突、印刷几何无法直接对齐结果表，以及0.5696%仅为表内CV。详见[核验笔记](MLA_FOCAL_REVIEW_2026-11-07.md)。待测试与实际发布；制造一致性及父003缺口不关闭。

003f发布验收：PR [#49](https://github.com/SelinLee/lens-evidence-atlas/pull/49)合并1466b11；75项测试、构建、主线CI及Pages[42257350004](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42257350004)成功。实际HTTPS v0.1.29与本地数据SHA256一致；独立Chrome无头1440/390 px查询、三定义、两来源弹窗、13参数样本反复开关/滚动、排序筛选及旧样本保留通过，截图已查看。仅关闭已发表报告与统计/预算边界核验；未解决原文冲突，不作制造一致性验收，父003继续开放。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-003g 阵列焦距、波前与光学口径术语 | Q0 | done | Codex | 2026-11-07 | 以可读正式条款区分焦距参考面、波前RMS/PV与衍射受限口径；补有效阿贝数公式、谱线和适用边界，不虚构样本或排序 |
| EVD-015a ISO14880已发布版本与预览边界 | Q1 | done | Codex | 2026-11-07 | 核2019/2024版状态及实际可读条款；草案、目录、正文分开，不将公开预览当全文合规审核 |

003g/015a认领：基线3dbf420，分支codex/mla-standard-definitions；上一批PR #50合并且Pages42259183178成功。ISO14880-1:2019的10页公开预览中，已视觉核PDF pp.9–10（印刷pp.3–4）；官方目录仍列Published并有DIS后继项目。Part2/3的正式正文预览正在核取，未核内容不填要求。

003g/015a候选v0.1.30：取得并视觉核Part2:2024英文预览印刷pp.1–5及Part3:2024印刷pp.1–4；新增两定义、两条条件化测试标准记录，区分仪器要求、建议和产品公差。77项测试、构建与本地Chrome桌面/手机验收通过，详见[核验笔记](MLA_STANDARDS_REVIEW_2026-11-07.md)。待PR/实际发布；Part3均匀性条款、后续预算及两标准附录未取得，父003/015继续开放。

003g/015a发布验收：PR [#51](https://github.com/SelinLee/lens-evidence-atlas/pull/51)合并d087e88，77项测试、构建、主线CI及Pages[42263046333](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42263046333)成功。实际HTTPS v0.1.30数据哈希与本地一致；独立Chrome无头桌面/390 px搜索、四定义、两出处、两标准记录反复开关滚动与旧样本保留通过，截图已看。仅关闭所述版本/节选交付，不代表取得全部标准或证明器件合规；父003/015继续开放。

| 稳定任务 | 优先级 | 状态 | 负责人 | 更新 | 验收范围 |
|---|---|---|---|---|---|
| EVD-003h 实测面形与波前传感性能关联 | Q0 | done | Codex | 2026-11-07 | 核Rouquette等2026作者稿，分开实测面形、相位/质心模拟、系统模拟与台架验证；补制造误差影响的条件化样本，不将模拟惩罚当实测制造公差 |

003h入口及已下载原文见日志35；当前只核标题/摘要，方法/图表未读，尚无新科学结论。

003h认领：基线5447f19，独立分支codex/mla-wavefront-performance；前批文档Pages42263874249已成功。Rouquette作者v1的14页正文和所有图页已读取，正在分离面形驱动模拟与台架方差比；图文冲突及原型编号跨实验对应关系保留待核。

003h候选v0.1.31：两定义、两个同团队模型/台架记录，见[逐图核验](MLA_CENTROID_REVIEW_2026-11-07.md)。79项测试、构建、独立Chrome无头桌面/390 px查询与引用检查通过；待PR、合并及实际Pages验收。原始帧/代码、制造公差和跨原型映射未取得，父003继续开放。

003h限定交付验收：PR [#53](https://github.com/SelinLee/lens-evidence-atlas/pull/53)合并49487e8，79项测试/构建/主线CI成功，Pages[42273180408](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42273180408)成功。HTTPS实际v0.1.31与本地哈希一致；Chrome无头1440/390 px查询、两定义、出处、9/10参数记录滚动开关与旧样本保留通过，截图已看。只关闭作者v1报告与条件边界核验；原型关联、原始数据和父003制造公差仍开放。

## 低NA既有证据的条件对照

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收重点 |
| --- | --- | --- | --- | --- | --- |
| EVD-001f 低NA独立样本逐字段对照 | Q0 | done | Codex | 2026-11-07 | 对Wang、Chu、Zheng、Balli已有记录逐字段核波段、介质、物理/合成NA、共轭、照明、分辨率口径、视场、效率分母与处理步骤；形成网页可查询的条件/缺口对照，补齐能取得的原文，不以协议不同为由虚构排名或永不交付 |

001f承接v0.1.17首批盘点的明确行动；不规定统一低NA界线，不把同论文变体/原图与重建当独立来源。需保留Balli未视觉核图、Zheng勘误及效率/采样口径冲突；验收以真实页面与来源边界为准，父001完整要求不缩减。

001f候选v0.1.32：六记录/五研究、八字段两项选择对照已实现，原参数与出处直接引用。补核Chu主文Fig.1/2及SI局部，保留60 s/4 s冲突与模拟NA/效率，见[笔记](LOW_NA_COMPARISON_REVIEW_2026-11-07.md)。83项测试、构建及Chrome无头桌面/手机检查通过；待PR/实际发布。Balli图像、统一测量协议及父001完整验收继续开放。

001f限定交付验收：PR [#55](https://github.com/SelinLee/lens-evidence-atlas/pull/55)合并acd8fb1，83项测试/构建/CI通过；Pages[42275668837](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42275668837)成功。实际HTTPS v0.1.32数据哈希一致，Chrome无头桌面/390 px六样本八字段、切换/交换/刷新、同研究提示、引用/详情与键盘焦点通过，截图已查看。只关闭本次既有样本条件视图和Chu增量核验，父001及018比较协议/合格集合仍开放。

## 光片含能量宽度的原文与代码

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收重点 |
| --- | --- | --- | --- | --- | --- |
| EVD-002e 含能量宽度积分协议与作者实现 | Q0 | done | Codex | 2026-11-07 | 核Remacha主文图页与附录链接的作者代码，固定版本后检查积分轴/范围、全宽/半宽、能量比例和传播长度阈值；保留63%/67%原文差异，不将模拟器输出当独立实验或正式勘误 |

002e入口：PMC6968747 Appendix C及Ref.40直接指向remachae/beamsimulator；本轮只读取仓库目录（GeneralFunctions、LightSheet_Simulator.mlapp、simulatebeam_gui.m），尚未核具体实现或复现。Europe PMC全文XML请求500；PMC网页可读，不因该接口失败停止任务。后续先核版本与原文，不从目录声称比例冲突已解。

002e候选v0.1.33：三定义补有限积分窗口、滑动全宽和双侧离散长度，新增固定版代码来源；Fig.2–3原图已看，保留63%/67%、L/L/2及双光子响应缺口。85项测试、构建和独立Chrome无头桌面/手机检查通过；详见[核验笔记](LIGHT_SHEET_PROTOCOL_REVIEW_2026-11-07.md)。待PR及实际发布，不关闭父002。

| ID / 范围 | 队列 | 状态 | 负责人 | 日期 | 验收重点 |
| --- | --- | --- | --- | --- | --- |
| EVD-002f 光片实验条件对照与父任务验收审计 | Q0 | todo | — | 2026-11-07 | 将Luo照明/系统、Battistella静态Airy、Shi单珠系统按对象、波段/介质、照明/检测NA、宽度、长度、效率与处理链作可查询对照；直接引用原参数，定位缺口。逐项审计父002原三项要求，不把“尚无统一最佳”当无限延后验收的理由；确需补证的条款与原因单独列明 |

002f准备检查：四条科研记录属于三个团队，Luo两个记录必须共享研究标识；ZEISS两配置为同一商业系统，不能当额外照明实验。Luo 152±1 μm是FOV；Battistella 0–3 mm是三位置测量跨度；Shi 16.8/18.0/20.0 μm是传播强度FWHM。对照要让这些差别可查，不把三个长度直接排序。仅复读当前已入库记录和旧核验笔记，尚未新增原文取证或实现此视图；不刷新其科学核验日期。

002e限定交付验收：PR [#57](https://github.com/SelinLee/lens-evidence-atlas/pull/57)合并4f2028b，85项测试/构建及CI成功；Pages[42278801906](https://github.com/SelinLee/lens-evidence-atlas/actions/runs/42278801906)成功。实际HTTPS v0.1.33 catalog.json与本地逐字节一致；Chrome无头1440/390 px三定义、两来源、六旧样本及重点应用回归通过。仅关闭原文/固定版静态实现核验，不代表运行MATLAB或解决发表物差异；父002继续按002f做逐项验收。


| DEVICE-005 VITURE Luma Pro 厂商规格 | Q0 | in_progress | Dot | 2026-11-14 | 单眼像素/最高刷新率/方向未明FOV/显示技术；103项测试/构建通过；待PR、审核与公开验收 |

2026-11-14恢复执行：codex/phone-xr-release基于a2f5f23，整合#59–63候选，补折线、型号/列多选、排序、导出和URL恢复。106项测试通过，本机Google Chrome无头四视口通过，待PR及实际Pages发布。候选指标定义仍需学术来源/任务重要性，型号覆盖与独立实测仍不齐，不关闭整体目标。

2026-11-14首批发布验收：DEVICE-001经PR #65整合，主线CI及Pages43561669359成功；实际0.2.4四发布文件与候选逐字节一致，Chrome四视口线上交互/导出通过，见[验收笔记](DEVICE_RELEASE_2026-11-14.md)。表格多选/列选择/排序、双轴散点与折线、URL恢复和CSV/SVG已上线；分类/测量条件的更细筛选、指标学术定义、独立实测及市场覆盖继续保留FOCUS任务。

下一批来源线索（已读边界）：vivo X300 Pro Global参数页Camera给后摄50+50+200 MP及配对光圈，但尚需overview明确模组名称配对；OPPO Find X9 Ultra Global规格页可读，其导航已列Find X10 Pro Max，先进型号覆盖不得只停在X9。Sony日本Xperia 1 VII规格页文字依然没有完整相机表，未因此填值。原厂Meta比较表已读Quest 3S/Meta VR Glasses列，后者上市/地区/分类需核实后再收录。只记录下一轮取证入口，不将这些未落库型号冒充当前表格覆盖。

| DEVICE-006 OPPO先进型号与手机定义来源 | Q0 | done | Codex | 2026-11-14 | Find X10 Pro Max Global逐模组像素/F数/FOV；F数与物理焦距定义定位来源、前端可点击引用与引用校验；不以规格当画质或全市场覆盖 |

DEVICE-006候选0.2.5：108项测试、构建和差异检查通过；Chrome无头1440/768/390/320覆盖五手机/三模组/XR、定义出处跳转、缺失状态、分享恢复和导出。F数/物理焦距两处引用与AF/OIS字段有定位证据，其他定义仍不冒称已补齐。见[本批笔记](PHONE_OPPO_DEFINITIONS_REVIEW_2026-11-14.md)，待实际发布。

DEVICE-006限定验收：PR #67合并07057dc，108测试/构建/CI通过，Pages43563596514成功；HTTPS四发布文件逐字节一致，线上Chrome无头四视口完成型号/模组/域、轴/折线、多选/排序、引用、分享恢复和两导出。仅关闭本次规格/定义引用交付，整体FOCUS证据任务开放。

| DEVICE-007 XR角分辨与画质测量协议 | Q0 | done | Codex | 2026-11-14 | 首项原始实验及PPD/CPD定义已由QUALITY-003a复核、经PR #72发布验收；见[本批核验](QUALITY_BATCH_2026-11-14.md)。标准条款、全场协议与先进设备证据继续保留缺口 |

007入口：IEC官方62508页已读2019版简介、适用范围和出版元数据，未取得条款；当前页面生命周期表未展开，不据搜索结果判定最新版/合规。PMC9691731《Spatiotemporal image quality of virtual reality head mounted displays》为独立测量候选，仅检索元数据/摘要线索，正文、图表尚未读取。下一轮先取原文与图像，不能采纳搜索摘要数字。
