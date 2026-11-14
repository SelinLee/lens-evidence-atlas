# 数据契约

`entity.schema.json` 是编辑器可用的基本结构契约。跨文件引用、排序依据、同条件比较、最佳声明限制由 `scripts/catalog.mjs` 的语义校验实现，并由反例测试覆盖。运行 `npm run validate` 与 `npm test`；JSON Schema本身不证明科学结论。

本轮核验基准的每个 `parameters[]` 必须有 `evidence: {source_id, location}`，且来源属于该记录。`corpus_best` 需有唯一的 `cohort_record_ids`、`comparison_keys` 与 `comparison_protocol`；候选必须同应用，并有完整一致的 `comparison_conditions`。这些字段只承载审核协议，不自动生成数值排行榜。

本库最优的 `comparison_keys` 还必须包含指标的全部 `required_conditions`，填写 `as_of`、`checked_on`、`selected_record_id`、`comparison_parameter_name`。每个候选对应参数需有匹配 `metric_id` 与定位来源；展示值必须等于选中记录参数值。上述检查不自动证明候选数值的科学可比性或最大/最小关系。

可选的参数 `metric_id` 一旦提供，必须指向本记录所属应用已列出的有效指标；即使不是 `corpus_best` 的候选也要校验。

## 设备与文献器件矩阵

`data/devices.json`的domains可扩展，并可声明name/category/row_unit；新文献器件沿用统一散点/表格/引用模板。研究行用evidence_type=study、study_id、measurement_scope，同一器件不同谱点用specimen_id关联，不计为独立研究。

数值指标的可选 `axis_bounds` 指定散点图自动留白的下限 `min` 和上限 `max`。例如器件口径的下限为 0，百分比聚焦效率的范围为 0–100。上下限仅约束留白，原始数值始终计入坐标范围。带符号畸变、位移与 dB 信噪比按实际范围展示。

研究每格必须有source、location、note、basis；basis区分reported_configuration、measured、model、derived_from_measurement、reconstruction、unresolved（原文待消歧）。实测PSF计算、模拟MTF与实验重建PSNR不能都标为measured。`value=null`配display可保留原文界限、冲突或曲线入口，不参加坐标绘制。均值可保存statistic=mean及uncertainty={type:SD,value,n}，原文±与样本量须保留；SD不是CI。语义校验由scripts/devices.mjs执行，不替代科学复核。

同一格可用sourceIds列多个原始来源，必须包含主source且各ID有效；统一界面须将这些ID全部映射并显示，不能只保留首项。efficiency_at_lambda_pct须有efficiency_lambda_nm及efficiency_protocol；efficiency_band_mean_pct须有工作波段、statistic=band_mean及协议。两类百分数都不能混成单元转换效率、最大效率或不明分母的统一排名。approximate=true的坐标保留“约”字。

手机MTF50的frequency_status区分author_scale_unverified（原表输出、标尺未核）与author_stated_unit（原文单位明确、方法仍可能缺失）。前者只允许在mtf50_app_reported/mtf50_imatest_reported，frequency_unit=author_scale，不能流入sfr或mtf50_cpp。后者的mtf50_cpp须明确frequency_unit=cycles/pixel；均须mtf_protocol保存边界。原表数字本身可追溯不代表已校准物理频率；多个软件处理同组图像不算独立研究。

原文方向明确的实测PSF宽度可用`fwhm_x_um`/`fwhm_y_um`，与未区分方向的`fwhm_um`分开；有限数值须为正、保留测量波长及`basis: measured`。XR对角FOV用`dfov`，不借给水平/垂直/方向未明列。原型SLM频率、CGH帧数与系统刷新率/延迟不互填；RGB离散测量不填写连续带宽。

来源的可选字段 `publication_source` 指向同一来源目录内的主文 ID。补充材料、作者数据和更正仍各保留原链接和定位，页面按主文统一编号。`visible_light_use` 用于已有原始记录明确描述可见光用途、但没有独立数值波长字段的旧样本。波长筛选优先采用逐点测量，其次判断工作波段是否与 380–780 nm 交叠。

文献题录在 `data/bibliography.json` 中按小写 DOI 共用，无 DOI 的学位论文按机构永久链接收录。`authors`、`title`、`venue`、`short`、`year` 来自出版方登记或原始存档，`volume` 和 `locator` 保存卷号、完整页段或文章号。按 LSA 期刊文献格式，五位及以下作者全列，六位及以上写首位加 et al.。同刊同年的不同论文在图中加首页或文章号。会议、预印本和学位论文使用实际发表或存档信息。[LSA 作者指南，第 4 页](https://www.nature.com/documents/Guide_for_Authors_LSA_updated_in_2026-1-15.pdf)

研究格可附可选的 `data_availability` 核查元数据。`status: curves_only` 表示在所列范围内只核到曲线，`author_numeric_mtf`、`raw_psf`、`independently_recomputed_mtf` 为 `null`，不表示作者没有这些数据。实际波长/方向/单位与缺失的场点、归一化及采样尺度分别保留，`search_log` 指向有日期和覆盖边界的核查记录。可展示的结论仍写入该格 `note`/`location`，数据获取声明的主文加入 `sourceIds`；元数据不直接生成数值坐标。作者由实测PSF计算与本库复算不能混称。

`focus_variation_um`保存作者报告的跨波长非负焦距变化幅度，与逐波长`measured_focal_um`分开。须有`focus_variation_protocol`、实际`sample_wavelengths_nm`及`statistic`：`author_reported_band_variation`仅表示作者所称variation，不能自动改称已复核的峰峰值；`maximum_pairwise_difference`表示作者明确的谱点最大互差。当前两种均为`basis: derived_from_measurement`、`calculation_origin: authors`；本库自行重算须另设记录/协议，不能覆盖作者报告。参考、轴向采样和缺失定义写入协议，约值保留`approximate`与`display`。汇总行不同时填写数值型`wavelength_nm`，不由百分数倒推绝对焦距或任意分派到一个波长。

可见光用途明确而仅有离散谱点汇总的研究器件可设`visible_light_use: true`，无需捏造连续工作波段或一个数值波长；实际单谱点波长已知时仍优先按其筛选。该规则同时适用于文献器件与旧记录。

`focus_error_um`/`focus_error_pct`保存作者定义未完全明确的focal length error汇总，须有`focus_error_protocol`、实际`sample_wavelengths_nm`、`statistic: author_reported_focal_error`、作者实测计算性质和`reference_wavelength_nm`（未知显式null）。它们不替代最大互差/逐点焦移；有单值波长的行不能混填汇总。`thickness_um`表示完整堆叠厚度，和`height_nm`分开。

设备材料可用`catalog_source`复用目录材料ID，跨域同论文不产生重复主文或SI。完整校验/构建同时检查别名目标、DOI与主文/SI归属；页面模型也拒绝不匹配。`sample_set_id`区分同结构配置的样品队列/选定单镜；单格`sample_size`和`statistic`保留原文n与均值，未知误差不补SD。

`operation_efficiency_at_lambda_pct`和`operation_efficiency_band_mean_pct`保留作者Operation效率，必须有独立`operation_efficiency_protocol`，分别绑定实际波长或工作范围/带内统计；不能混入聚焦效率字段。`reported_error: {type: SD | not_specified, value, sample_size: null | n}`允许作者报告±但未给n的情形，未知n显式null、误差非负；定义不明不能升级为SD。`display`保留原文±和约值，散点读数也显示该±。旧`uncertainty`的已知n/SD规则保持。

`focus_variation_pct`保存作者实测焦点的百分比variation，沿用`focus_variation_um`的实际谱点、协议、作者计算与汇总约束；另保留`denominator`和`reference_wavelength_nm`/`reference_focal_um`（未知显式null）。`denominator: not_defined`不允许解释成已知分母；不能由百分数倒算μm、把作者中心焦点复制为各波长精确焦距，或和RMS/最大互差直接混用。原作冲突参数使用null+display/note保存，不选择一个值打点。

`measured_focal_band_mean_um`仅保存作者明确给出的同器件跨实测波长平均焦距，须为正数、`basis: derived_from_measurement`、`calculation_origin: authors`、`statistic: author_reported_spectral_mean`，并有至少两个不同的实际`sample_wavelengths_nm`、`reference_plane`、`aggregation_note`及`psf_protocol`。未知参考原点、谱权重、重复数和不确定度须在说明中保留；汇总行不绑定一个数值波长，不将均值复制为逐波长`measured_focal_um`或设计焦距。DOF公共区与DOF误差条不是残余焦移或统计SD/CI，不据区间宽度生成色差数值。

`aoi_deg`是入射光相对光轴的测量角度，不是FOV；须有`angle_reference: incident_beam_to_optical_axis`、`azimuth_deg`（未知null）及`psf_protocol`说明光路/焦面。固定传感器面PSF不代表该波长最佳焦距，轴向扫描步长不替代横向物方标尺。不同光源/继像条件可在同一结构配置中分测量行，不虚增物理样品。

`system_contrast_protocol`区分作者称MTF contrast的USAF线对Michelson对比度与PSF-FFT/严格正弦MTF。`metric_kind: usaf_michelson_linepair_contrast`、`direction_aggregation`（horizontal/vertical/mean_of_horizontal_vertical）、`frequency_unit: lp/mm`、`field_point`（未知null）、实际谱点和`processing_stage`必须保留；captured标作者`derived_from_measurement`、deconvolved标`reconstruction`，不能互换或把横纵平均改成独立S/T。多谱点汇总不绑定一个数值波长。MTF低于0.01的阈值不是频率测量值，中心像素/传感器圆域总计数也不混入聚焦功率效率。
