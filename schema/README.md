# 数据契约

`entity.schema.json` 是编辑器可用的基本结构契约。跨文件引用、排序依据、同条件比较、最佳声明限制由 `scripts/catalog.mjs` 的语义校验实现，并由反例测试覆盖。运行 `npm run validate` 与 `npm test`；JSON Schema本身不证明科学结论。

本轮核验基准的每个 `parameters[]` 必须有 `evidence: {source_id, location}`，且来源属于该记录。`corpus_best` 需有唯一的 `cohort_record_ids`、`comparison_keys` 与 `comparison_protocol`；候选必须同应用，并有完整一致的 `comparison_conditions`。这些字段只承载审核协议，不自动生成数值排行榜。

本库最优的 `comparison_keys` 还必须包含指标的全部 `required_conditions`，填写 `as_of`、`checked_on`、`selected_record_id`、`comparison_parameter_name`。每个候选对应参数需有匹配 `metric_id` 与定位来源；展示值必须等于选中记录参数值。上述检查不自动证明候选数值的科学可比性或最大/最小关系。

可选的参数 `metric_id` 一旦提供，必须指向本记录所属应用已列出的有效指标；即使不是 `corpus_best` 的候选也要校验。

## 设备与文献器件矩阵

`data/devices.json`的domains可扩展，并可声明name/category/row_unit；新文献器件沿用统一散点/表格/引用模板。研究行用evidence_type=study、study_id、measurement_scope，同一器件不同谱点用specimen_id关联，不计为独立研究。

数值指标的可选 `axis_bounds` 指定散点图自动留白的下限 `min` 和上限 `max`。例如器件口径的下限为 0，百分比聚焦效率的范围为 0–100。上下限仅约束留白，原始数值始终计入坐标范围。带符号畸变、位移与 dB 信噪比按实际范围展示。

研究每格必须有source、location、note、basis；basis区分reported_configuration、measured、model、derived_from_measurement、reconstruction、unresolved（原文待消歧）。实测PSF计算、模拟MTF与实验重建PSNR不能都标为measured。`value=null`配display可保留原文界限、冲突或曲线入口，不参加坐标绘制。均值可保存statistic=mean及uncertainty={type:SD,value,n}，原文±与样本量须保留；SD不是CI。语义校验由scripts/devices.mjs执行，不替代科学复核。

由同一测量行的作者透过率和透过功率归一聚焦效率换算口径内入射功率归一效率时，`efficiency_at_lambda_pct` 使用 `basis: derived_from_measurement`、`calculation_origin: atlas`、`statistic: product_of_measured_power_ratios`、`denominator: incident_through_aperture`、`approximate: true`。保留 `input_metrics`、`input_values_pct`、`rounding_decimals` 及公式，需绑定同一实测波长和效率协议；原有两项作者比值保留原分母。

同一格可用sourceIds列多个原始来源，必须包含主source且各ID有效；统一界面须将这些ID全部映射并显示，不能只保留首项。efficiency_at_lambda_pct须有efficiency_lambda_nm及efficiency_protocol；efficiency_band_mean_pct须有工作波段、statistic=band_mean及协议。两类百分数都不能混成单元转换效率、最大效率或不明分母的统一排名。approximate=true的坐标保留“约”字。

作者只对测试谱点报告平均效率时，可在`efficiency_band_mean_pct`保留`sampling: measured_wavelength_subset`、`sample_wavelengths_nm`、`sample_unit: wavelength`和作者计算归属；`display`/`note`必须明确“谱点平均，非连续全谱积分”。工作波段仍是设计/声明范围，不自动成为平均积分区间；`replicates_per_wavelength`属于效率协议，与波长数、物理样本数、跨波长均值误差分开。没有原始逐点值时不反推均值或误差棒，不把每λ的n/CI复制给汇总均值。

手机MTF50的frequency_status区分author_scale_unverified（原表输出、标尺未核）与author_stated_unit（原文单位明确、方法仍可能缺失）。前者只允许在mtf50_app_reported/mtf50_imatest_reported，frequency_unit=author_scale，不能流入sfr或mtf50_cpp。后者的mtf50_cpp须明确frequency_unit=cycles/pixel；均须mtf_protocol保存边界。原表数字本身可追溯不代表已校准物理频率；多个软件处理同组图像不算独立研究。

原文方向明确的实测PSF宽度可用`fwhm_x_um`/`fwhm_y_um`，与未区分方向的`fwhm_um`分开；有限数值须为正、保留测量波长及`basis: measured`。XR对角FOV用`dfov`，不借给水平/垂直/方向未明列。原型SLM频率、CGH帧数与系统刷新率/延迟不互填；RGB离散测量不填写连续带宽。

XR 域可使用 `wavelength_nm`、`diameter_um`、`design_focal_um`、`na`、`fwhm_x_um`、`psf_protocol`、`mtf_curve` 保存独立目镜光学表征，而非整机显示性能。对于作者由裸目镜实测PSF计算的线频曲线（`mtf_kind: measured_eyepiece_psf_curve`），要求 `derived_from_measurement`、authors、`bare_eyepiece_optical_psf`、cycles/mm、正常入射、自己的逐色焦面、对应波长实测x向半高全宽及未知归一化/方向/原始数据明确记录；不转填整机CPD、截止频率或指定频率MTF。只列名义焦距的器件不记为轴扫实测。三色离散共轭补偿显示系统可以作为XR研究，不能凭此将裸镜归消色差矩阵；同文裸镜和完整系统分配置。

`rgb_radial_psf_fwhm_um` 保存白光相机 R/G/B 通道的实测径向 PSF 宽度。保留 `color_channel`、`direction: radial`、`spectral_sampling: rgb_camera_channel` 和带同一通道与评价面的 `psf_protocol`。通道中心未给时，`wavelength_nm.value` 留空。`restored_angular_resolution_lp_mrad` 保存作者由重建图读出的标靶角频率，使用 `basis: reconstruction`、`calculation_origin: authors` 和 `frequency_unit: lp/mrad`。标靶及重建步骤在同一行的协议里对应。原文折合像方 lp/mm 如有给出可保留在该格说明。

来源的可选字段 `publication_source` 指向同一来源目录内的主文 ID。补充材料、作者数据和更正仍各保留原链接和定位，页面按主文统一编号。`visible_light_use` 用于已有原始记录明确描述可见光用途、但没有独立数值波长字段的旧样本。波长筛选优先采用逐点测量，其次判断工作波段是否与 380–780 nm 交叠。

文献题录在 `data/bibliography.json` 中按小写 DOI 共用，无 DOI 的学位论文按机构永久链接收录。`authors`、`title`、`venue`、`short`、`year` 来自出版方登记或原始存档，`volume` 和 `locator` 保存卷号、完整页段或文章号。按 LSA 期刊文献格式，五位及以下作者全列，六位及以上写首位加 et al.。同刊同年的不同论文在图中加首页或文章号。会议、预印本和学位论文使用实际发表或存档信息。[LSA 作者指南，第 4 页](https://www.nature.com/documents/Guide_for_Authors_LSA_updated_in_2026-1-15.pdf)

研究格可附可选的 `data_availability` 核查元数据。`status: curves_only` 表示在所列范围内只核到曲线，`author_numeric_mtf`、`raw_psf`、`independently_recomputed_mtf` 为 `null`，不表示作者没有这些数据。实际波长/方向/单位与缺失的场点、归一化及采样尺度分别保留，`search_log` 指向有日期和覆盖边界的核查记录。可展示的结论仍写入该格 `note`/`location`，数据获取声明的主文加入 `sourceIds`；元数据不直接生成数值坐标。作者由实测PSF计算与本库复算不能混称。

`focus_variation_um`保存作者报告的跨波长非负焦距变化幅度，与逐波长`measured_focal_um`分开。须有`focus_variation_protocol`、实际`sample_wavelengths_nm`及`statistic`：`author_reported_band_variation`仅表示作者所称variation，不能自动改称已复核的峰峰值；`maximum_pairwise_difference`表示作者明确的谱点最大互差。当前两种均为`basis: derived_from_measurement`、`calculation_origin: authors`；本库从作者正文给出的实测焦距上下限计算宽度时，使用 `calculation_origin: atlas`、`statistic: range_width_from_reported_bounds` 和 `author_reported_focal_bounds_um`。此行保留原印字范围和计算式，逐波长焦距仍留空。用同配置已报告逐谱点位置计算跨度时，使用 `statistic: measured_axial_peak_span`（轴向峰）或 `measured_focal_position_span`（作者报告焦位）。以 `measurement_record_ids` 绑定各实际谱点，有限共轭时指定 `input_metric: measured_image_distance_um` 和 `formula: max(z) - min(z)`。参考、轴向采样和缺失定义写入协议，约值保留`approximate`与`display`。汇总行不同时填写数值型`wavelength_nm`，不由百分数倒推绝对焦距或任意分派到一个波长。

两谱点差值可以用 `statistic: paired_measured_axial_peak_difference` 保存。使用 `basis: derived_from_measurement`、`calculation_origin: atlas`、`formula: abs(f_2 - f_1)`、实际样本波长和同器件的两条 `measurement_record_ids`。原始行须为实测轴向强度峰位。不同照明带宽、偏振和测量不确定度写入协议。两点差值只描述这两个条件。 本库复算多谱点的实测峰峰焦差时，使用 `statistic: measured_axial_peak_span` 与 `formula: max(f) - min(f)`。按相同顺序提供实际波长与同器件的实测峰位记录。

可见光用途明确而仅有离散谱点汇总的研究器件可设`visible_light_use: true`，无需捏造连续工作波段或一个数值波长；实际单谱点波长已知时仍优先按其筛选。该规则同时适用于文献器件与旧记录。

`focus_error_um`/`focus_error_pct`保存作者定义未完全明确的focal length error汇总，须有`focus_error_protocol`、实际`sample_wavelengths_nm`、`statistic: author_reported_focal_error`、作者实测计算性质和`reference_wavelength_nm`（未知显式null）。作者明确报告单谱点相对设计焦距或设计焦面的误差幅值时，实测谱点行可用 `statistic: author_reported_single_wavelength_error`、单成员 `sample_wavelengths_nm`、`reference_kind` 和 `reference_plane_um`。名义焦距只有约值时注明其近似性，差值方向未报时保持未知。汇总及单点误差均不代替最大互差或绝对实测焦位。`thickness_um`表示完整堆叠厚度，和`height_nm`分开。

设备材料可用`catalog_source`复用目录材料ID，跨域同论文不产生重复主文或SI。完整校验/构建同时检查别名目标、DOI与主文/SI归属；页面模型也拒绝不匹配。`sample_set_id`区分同结构配置的样品队列/选定单镜；单格`sample_size`和`statistic`保留原文n与均值，未知误差不补SD。

`operation_efficiency_at_lambda_pct`和`operation_efficiency_band_mean_pct`保留作者Operation效率，必须有独立`operation_efficiency_protocol`，分别绑定实际波长或工作范围/带内统计；不能混入聚焦效率字段。`reported_error: {type: SD | SE | not_specified, value, sample_size: null | n}`允许作者报告±但未给n的情形，未知n显式null、误差非负。SE 支持作者明确报告的拟合标准误，采样数不明时保留 null。定义不明使用 not_specified。`display`保留原文±和约值，散点读数也显示该±。旧`uncertainty`的已知n/SD规则保持。

`focus_variation_pct`保存作者实测焦点的百分比variation，沿用`focus_variation_um`的实际谱点、协议、作者计算与汇总约束；另保留`denominator`和`reference_wavelength_nm`/`reference_focal_um`（未知显式null）。`denominator: not_defined`不允许解释成已知分母；不能由百分数倒算μm、把作者中心焦点复制为各波长精确焦距，或和RMS/最大互差直接混用。原作冲突参数使用null+display/note保存，不选择一个值打点。

`measured_focal_band_mean_um`仅保存作者明确给出的同器件跨实测波长平均焦距，须为正数、`basis: derived_from_measurement`、`calculation_origin: authors`、`statistic: author_reported_spectral_mean`，并有至少两个不同的实际`sample_wavelengths_nm`、`reference_plane`、`aggregation_note`及`psf_protocol`。若原文明确报告作者平均实测焦距和工作范围，但实际谱点清单未能核实，允许 `sample_wavelengths_nm: null`、`spectral_sample_scope: author_reported_range_only`，须有正值工作波段上下限；在说明中保留谱点缺口，不把端点当成已核的实际采样。未知参考原点、谱权重、重复数和不确定度须在说明中保留；汇总行不绑定一个数值波长，不将均值复制为逐波长`measured_focal_um`或设计焦距。DOF公共区与DOF误差条不是残余焦移或统计SD/CI，不据区间宽度生成色差数值。

`focal_spectral_sd_um`是作者跨实测波长的焦距光谱SD，非逐点±不确定度、重复样品SD或DOF。要求非负、`basis: derived_from_measurement`、`calculation_origin: authors`、`statistic: spectral_standard_deviation`、`sample_unit: wavelength`、至少两个实际谱点及`focus_variation_protocol`；只在无单值波长的汇总行填写。`ddof`为0/1或未知null，`measurement_repeat_count`为实际重复数或未知null；不把谱点数量充当实物重复n，不用通用`uncertainty`把它附到每个焦距。

`reported_focal_band_center_um` 保存作者只报告工作带内“焦距 ± 数值”、没有把中心定义为均值且没有解释误差的原文；要求 measured、author_reported_band_value_with_unspecified_error、reported_error.type=not_specified、sample_size=null、无单波长、有效工作范围、sample_wavelengths_nm=null、author_reported_range_only 及 psf_protocol。不把中心值当光谱均值或逐色实测，不把±当残余焦差或 SD。


`axial_focus_offset_um`是本库由作者实测f减去明确固定像面`reference_plane_um`算出的有符号焦差，`basis: derived_from_measurement`、`calculation_origin: atlas`，`formula: measured_focal_um - reference_plane_um`。要求本行实际波长/实测f、`reference_plane_description`、`psf_protocol`及精确来源位置；该固定面类型的`reference_wavelength_nm`显式null。验证数值与输入差一致，允许正、负和真实零；不默认选择设计f，不称作者原始焦移表或PSF/MTF复算。版本只核到作者稿的输入须在display/note保留版本，原作者量与本库计算分别标明。

有限共轭设计像距与实测聚焦位置使用 `design_image_distance_um`、`measured_image_distance_um`。两者均保留 `object_conjugate: finite` 和与 `psf_protocol.reference_plane` 相同的参考面。实测像距绑定实际谱点，近轴焦距各自保留。用这两种像距计算单波长的有符号残差时，在 `axial_focus_offset_um` 指定 `input_metric: measured_image_distance_um`，计算 `measured_image_distance_um - reference_plane_um`。`reference_plane_um` 默认须等于该行的设计像距。若原文以标称设计焦距作同一轴坐标中的固定参照，标 `reference_metric: design_focal_um` 并具体定位参考线。此时有限共轭设计像距仍按原文证据填写。

`diffraction_limited_reference_fwhm_um` 标记作者理想模型、相应实测或模拟波长及 `psf_protocol`。理想模型可为 Airy 参考或理想相位掩模传播，切线方向未知可记录为 `unspecified`。实物与等 NA 缩比模型的宽度使用对应字段。

当同篇有多种制程而定量表征归属未明确时，可用`configuration_role: unassigned_measurement_set`保留该测量配置，`candidate_specimen_ids`列至少两个同study中存在且不同的候选结构配置。样本名和`measurement_scope`须明确待核且非额外独立实物；不能仅据共同几何/定性成像就将整组PSF/效率复制给每个候选。

`incident_power_uw`与`focused_power_uw`保存原表的μW光功率，须有实际波长、`basis: measured`、`quantity: optical_power`、`original_unit: μW`和`efficiency_protocol`，非负且保留原列头/数值精度。原列名写intensity但单位为μW时按功率量纲说明，不当W/m²；未知积分焦圈/功率计/校准继续注明。作者由功率比给出的效率可为`derived_from_measurement`/`calculation_origin: authors`，与模拟百分数分开；本库只做舍入一致性检查时不覆盖作者值或创建新测量。

当作者明确提供圆形口径的几何设计式及D/NA，而未印出数值设计f时，可在`design_focal_um`标`basis: model`、`calculation_origin: atlas`、`calculation_method: circular_aperture_na_relation`，保留`formula: diameter_um / (2 * tan(asin(na)))`、与本行一致的`inputs`、`rounding_increment_um: 0.01`和`approximate: true`。该方法要求D>0、0<NA<1，并核对0.01μm舍入结果；display明确本库按作者式计算，不能称作者原始实测、复制到`measured_focal_um`或默认与轴向z相减。其他历史设计计算仍按各自方法和证据保留。`value:null`的焦移界限可附`bound`及实际谱点，但不把界限3μm当精确数值打点；效率区间也不自动生成逐λ或均值。

`aoi_deg`是入射光相对光轴的测量角度，不是FOV；须有`angle_reference: incident_beam_to_optical_axis`、`azimuth_deg`（未知null）及`psf_protocol`说明光路/焦面。固定传感器面PSF不代表该波长最佳焦距，轴向扫描步长不替代横向物方标尺。不同光源/继像条件可在同一结构配置中分测量行，不虚增物理样品。

`system_contrast_protocol`区分作者称MTF contrast的USAF线对Michelson对比度与PSF-FFT/严格正弦MTF。`metric_kind: usaf_michelson_linepair_contrast`、`direction_aggregation`（horizontal/vertical/mean_of_horizontal_vertical）、`frequency_unit: lp/mm`、`field_point`（未知null）、实际谱点和`processing_stage`必须保留；captured标作者`derived_from_measurement`、deconvolved标`reconstruction`，不能互换或把横纵平均改成独立S/T。多谱点汇总不绑定一个数值波长。MTF低于0.01的阈值不是频率测量值，中心像素/传感器圆域总计数也不混入聚焦功率效率。

`simulated_focal_um`保存作者模拟轴向焦位，正值、`basis: model`、`calculation_origin: authors`和`psf_protocol`。轴向峰强度取焦用`position_definition: axial_intensity_maximum`及明确模型谱点（`wavelength_nm`也为`model`）。原表报告模型焦位但取焦细节和实际网格波长待核时，可用`author_reported_unspecified`及`model_wavelength_status: author_nominal_design_only`，`wavelength_nm.value`留空并保留`psf_protocol.nominal_design_wavelength_nm`。同一行的数值型模拟和实测焦位互斥。报告的模型焦位、设计f、实测焦位和本库复算各自溯源。

实测轴向最小横向FWHM取焦用`measured_focal_um`、`position_definition: minimum_transverse_fwhm`、`basis: derived_from_measurement`及作者计算，绑定实测谱点与`psf_protocol`。轴位、区间宽度和示例剖面采集面的来源分开。`cylindrical_aperture_width_um`保存柱面光学器件具有光焦度方向的横向尺度，圆形口径列按器件的原始定义填写。

`author_longest_focal_depth_um`保存作者以指定轴向强度阈值定义的最长焦深/位置，不是最佳焦点或轴向DOF宽度。要求正值、实际λ、`basis: derived_from_measurement`、作者计算、`statistic: author_longest_focal_depth`、`threshold_intensity_fraction`在(0,1]、`reference_origin`（未知null）及`psf_protocol`。不能把阈值位置差当残余焦移。

`depth_of_focus_um`保存作者按实测横向光束形状或其他明确判据给出的轴向区间宽度。记录实测λ、`dof_criterion`、作者实测计算和`psf_protocol`。`minimum_psf_fwhm_x_um`保存作者从近焦实测剖面中得到的最小x向半高全宽，记录`statistic`和`psf_protocol`。未知选面和光源继续留空。两者各自保留统计定义与采样范围。

`reported_axial_scan_focusing_efficiency_pct`保存作者在轴扫效率段报告的功率比，保留`statistic`、`denominator`、作者实测计算和与分母一致的`efficiency_protocol`。作者的轴向单位或参考面存疑时保留原轴和缺口。专项报告值与指定λ的单焦面效率、带均值及整套光路模型使用各自的字段。

`simulated_depth_of_focus_um`和`simulated_psf_fwhm_x_um`用于模型计算，标作者归属与`psf_protocol`，分别保留`dof_criterion`和x向的`statistic`。`simulated_focusing_efficiency_pct`保存作者模拟焦区对入射总功率的比值。`simulated_aperture_power_ratio_pct`保存同孔径面积内焦面与器件面积分之比，允许两种协议各以独立行保存。百分数与`efficiency_protocol`的分母须一致。论文只称入射光能量时，保存 `incident_light_energy` 并记录具体计量光阑的缺口。

`simulated_fwhm_um` 保存作者模拟横向焦斑的 FWHM。用 `basis: model`、`calculation_origin: authors` 与相应波长。方向或评价面原文未明时标 `direction: unspecified` 或 `evaluation_plane_um: null`。

`simulated_phase_strehl` 和 `simulated_psf_strehl` 保存作者的模拟 Strehl。前者从相位量化误差估算峰强衰减，后者将模拟与理想衍射剖面等积分归一后比较峰强。两者要求 0–1、`basis: model`、作者计算、模拟波长、理想模型和 `psf_protocol`。剖面的积分窗已知时保留，模型与实验各用对应指标。

`processed_psf_fwhm_um`与裸PSF宽度分列：正值、实际λ、`basis: reconstruction`、作者计算、`processing_stage: linear_intensity_subtraction`和非负系数；`psf_protocol`须绑定同系数与数值固定评价面。该行不能同时填写数值裸PSF FWHM。作者图内印字可录，负旁瓣/零点/归一化和未知拟合条件必须说明；不把处理后变窄当裸镜光学性能。

`image_snr_db`是作者图像SNR，和phone的snr、PSNR及ASNR不同字段。须`calculation_origin: authors`、`statistic: author_reported_image_snr`与`image_snr_protocol`的信号/噪声公式、`metric_kind: author_image_signal_background_ratio`、靶、ROI/噪声估计（未知null）。captured行用derived_from_measurement，linear_intensity_subtraction行用reconstruction并保留非负系数；单λ或明确白光照明与null波长必须绑定。作者只称背景fluctuation时不擅自补为SD/方差或把10log改成20log；重复数、曝光/增益、基线/通道配准与误差缺口写入协议。

`reconstruction_depth_cm` 为作者光场重建设置的物方深度（cm），不是光学焦距、像面距离或实际物深；绑定 lightfield_disparity_rendered_edge、具体靶及实际物深。`reconstructed_edge_peak_background_ratio` 是作者计算重建的无量纲最大边缘信号／背景比；要求 reconstruction、authors、author_reported_edge_peak_background_ratio、dimensionless、同一阶段/靶/深度/物深的 image_snr_protocol 和明确白光照明、未知单λ。不可混写为 dB SNR、PSNR、MTF 或裸镜测量。背景定义/ROI/曝光和重复数未知留空。


`efficiency_band_mean_pct`可保存作者明确写出的论文级未分派均值，用`aggregation_scope: publication_unassigned_devices`、作者由实测计算与`sampling`（未报告可写not_reported）。此时行须unassigned_measurement_set及有效器件候选，diameter_um/na/wavelength_nm均显式null，协议device_assignment=unassigned；不可将该均值复制到各口径或各λ。约值保留approximate/display；图示谱点与平均权重未知分别记录，不称已核连续谱积分。

`data_availability.status: no_mtf_in_checked_material`表示所列已读主文/SI只核到PSF/f/效率等图表，未报告MTF；与curves_only（已核MTF曲线）分开。无MTF轴就不填写频率单位/方向/数表；作者合理请求、搜索范围和原始PSF采样缺口继续保留。

`mtf_curve.mtf_kind: measured_psf_radial_average`用于作者由实测PSF计算的径向平均MTF。填写物方共轭、固定评价面、lp/mm及实际有独立MTF面板的谱点。某波长只有PSF面板时，`individual_curve_panel=false`，独立MTF面板列表为空。像方频率参考面、物方采样或零频归一化未知时分别留空。`reconstructed_slanted_edge`带重建性质和相机的RGB颜色通道。单值波长字段留空，通道中心有出处时另存为滤片配置。

`measured_psf_frequency_cross_section`保存作者按物理频率归一的实测PSF MTF横截面，要求实际波长、`frequency_unit: normalized_spatial_frequency`、归一基准`normalization_frequency_cycles_mm`和`psf_protocol`。方向和评价面待核时均留空。`simulated_psf_correlation_bandwidth_nm`单独保存作者以模拟PSF相关性定义的光谱带宽，要求`basis: model`、作者计算、参考波长、相关性阈限与比较条件。带宽或参考波长只在其自身字段呈现，实测谱点与实测工作带宽仍按实测证据保存。

`estimated_system_focal_efficiency_pct`、`estimated_detected_throughput_pct`和`spectrally_weighted_mtf_area_lpmm`保存作者完整光路的带内计算估计。须标明`basis: model`、作者计算与光路估算协议。面积保留空间频率积分的量纲 lp/mm。它们与逐λ实测效率、普通作者平均效率及MTF截止频率各用专用字段。图像PSNR、SSIM和LPIPS保留原采集或重建、参考图、配准与光度归一化及统计样本。

`signed_normalized_focal_error_pct` 保存作者根据同一实物波长扫描报告的单谱点有符号百分差。用实际照明波长、`basis: derived_from_measurement`、作者计算、`statistic: author_reported_signed_normalized_focal_error` 与原始列项名，关联 `focus_error_protocol` 和 `psf_protocol`。零值照录，参考波长和归一化分母未知时显式留空。工作簿的零点波长可在协议注明，绝对焦位、带内汇总和物理焦差各自使用对应字段。

`optical_transmittance_pct`保存作者报告的总透射与入射参考值的百分比。口径内入射功率用 `incident_through_aperture`，作者明示为总入射光强积分时用 `incident_light_total_intensity` 并在协议中设置同一分母和实际已知的入射范围。`focusing_efficiency_transmitted_pct`保存焦区积分功率与总透过功率的百分比，分母为`transmitted_power`。两个字段均要求实测谱点、`basis: derived_from_measurement`、`calculation_origin: authors`及`efficiency_protocol`。焦区长度尺度和形状分别记录，半径或直径未明时保留缺口。

`polarization_isolation_ratio` 保存作者由实测焦区功率得到的无量纲偏振隔离比。保留 `unit: power_ratio`、作者计算、两个积分区域的定义及 `psf_protocol`。作者仅报告最大值时用 `statistic: author_reported_maximum`，在汇总行保存采样范围。具体波长、偏振和截向未给时留空。聚焦效率仍使用其入射或透射功率分母。

`resolved_test_line_width_um` 保存实拍标靶中作者辨认的对象侧线宽，附靶型、组/元素、采集通道、场点和对比阈值。共同阈值界限保留 `value=null`。

`simulated_axial_fwhm_um` 保存模型 z 向强度半高全宽。`simulated_relative_spherical_aberration_pct` 保存作者以名义像距为分母的比例原印字，附名义像距并与未归一化 z 宽度分列。两处印字换算有差异时保留原值及对读记录。

`system_slanted_edge_mtf` 保存作者由多色实拍斜边计算的无量纲MTF，和 `mtf_spatial_frequency_lpmm`、`mtf_curve` 的频率单位、处理阶段、方向及场点共同使用。全场平均和作者最大场点分开；数值角度未报告时写空。保留原始斜边、归一化、物像面频率和逐频表的缺口。

`spectral_mean_mtf10_cycles_mm` 保存作者以多波长实测 PSF 得到的平均 MTF 的 10% 阈值频率。使用 `basis: derived_from_measurement`、作者计算、离散光谱样本和 `threshold_fraction: 0.1`。须有固定评价面和 `mtf_curve.mtf_kind: from_measured_psf_spectral_mean`。正文的 cycles/mm 和曲线的 lp/mm 各保留原标。尚未取得方向、频率参考面、dB 换算与原始数据时逐项留空。

`diffraction_efficiency_mean_pct` 保存作者对波长与设备设定一并取平均的衍射效率。记录焦面和参照面各自的积分范围、功率分母及统计性质。计算来源为作者实测，统计用 `statistic: mean_across_wavelengths_and_settings`，平均值行的单波长留空。`aperture_width_um` 保存实物或模型孔径宽度，附形状、宽度定义及重叠光瞳的适用边界。圆孔直径继续使用 `diameter_um`。

`mirror_referenced_efficiency_max_pct` 保存作者报告的光谱扫描最大焦点强度比。用 `basis: derived_from_measurement`、作者计算和 `statistic: spectral_maximum`，在该格及 `efficiency_protocol` 同时记录 `denominator: metallic_mirror_reflected_intensity_same_pixel_size`。单波长留空，另保留峰值对应谱点及检测像素的可用性。普通入射功率归一效率有独立字段。

`reference_lens_efficiency_peak_pct` 保存作者报告的光谱最大焦区功率比。按实验方法记录样品交叉偏振、参考光路移除校正片并改用平行偏振器。聚焦效率格与 `efficiency_protocol` 使用同一分母 `uncorrected_refractive_lens_parallel_polarizers_power`。峰值归属单谱点待核时留空。偏振扫描的焦圈与分母随各自测量条件记录。

`secondary_axial_peak_um` 保存实测附加焦点的位置，和同一行的主焦位共用轴向参考面、实测波长和偏振条件。保留作者的约值、单位和峰位定义。两色各自落在同一标称面时，只有精确主焦测量才能量化残余焦移。

`simulated_geometric_rms_spot_radius_um` 保存由有效几何射线交点求得的 RMS 半径。标 `basis: model`、`statistic: rms_ray_intercept_radius`、作者输出或本库复算、模拟波长及 `evaluation_plane_um`。`psf_protocol` 保存几何追迹种类和同一评价面，并记录落点参考、采样网格和场点。半能量宽度、实测强度 PSF 和轴向焦距使用各自的字段。

作者只给出带内焦距变化及波长范围时，`focus_variation_um`、`focus_variation_pct` 可用 `spectral_sample_scope: author_reported_range_only`，逐点列表留空，须有同一行的上下波长和协议。不能用抽样曲线推定精确采样点并作为原始数据。

`effective_na_from_psf` 保存作者由焦斑推得的有效NA、公式与谱点，按原文保存汇总值。单波长的作者焦距误差用 `author_reported_single_wavelength_error` 与明确的设计面或设计焦距，波长须和行一致。界限用 `value=null` 保存。

`mtf_curve.mtf_kind: measured_psf_fft_normalized` 保存作者由实测PSF求得的、仅有归一化频率图的MTF。频率分母未核时保留 `normalization_frequency_cycles_mm: null`。未明确1D切线方向则填 `unspecified`，不生成绝对空间频率。模拟效率的分母未给时用 `author_denominator_unreported` 并附 `denominator_note`。

`reported_effective_focal_um` 和 `reported_effective_na` 保存作者在色散设计语境中报告的谱点有效值。注明波长、方法和设计参考，逐点实测焦位等待具有计量定位的证据。`author_reported_mtf_cutoff_lpmm` 保存作者直接声明的截止频率，保留阈值与频率标定缺口。由实测 PSF 派生的归一化 MTF 若缺少频率标定，曲线的 `normalization_frequency_cycles_mm` 仍留空。

`simulated_cpt_mean_pct` 保存跨带单元偏振转换模拟的作者均值。注明单元、波段、涂层、采样和分母，持续区分器件实测焦区效率。

`relative_fluorescence_collection_pct` 使用参考物镜收集到的荧光为分母，绑定 `efficiency_protocol` 中的物镜型号、NA、激发条件与积分范围。`fluorescence_collection_spectral_width_nm` 保存作者由测得荧光谱报告的带宽，未知谱宽判据和端点保留空值。两项属于宽谱采集，`wavelength_nm` 留空，并另存设计参考中心。

`system_lateral_psf_fwhm_um` 和 `system_axial_psf_fwhm_um` 保存作者从宽谱发光成像所求的 X／Z 半高全宽。`psf_protocol` 关联激发波长、收集滤光及扫描方式，`spectral_sampling` 使用 `broadband_emission`。逐波长字段留空，作者拟合依据与发光样品条件随表格保留。

`vortex_inner_fwhm_um` 保存实测环形光斑的内侧两个半高交点间距，绑定波长、偏振及同向 `psf_protocol`。`reverse_collection_efficiency_pct` 保存从样品侧送光后测得的收集功率比，绑定测量波长、镜后收集距离、参考物镜、功率分母及积分范围。环内半高宽度和反向收集功率比各用独立指标。

`imaging_feature_width_um` 保存有限尺寸样品在成像系统中的横截线宽度。`width_definition` 区分作者直报的 `fwhm` 与半高定义未明的 `author_fit_width`。记录拟合对象、截线方向、耗尽光条件和扫描步长。实测样品线宽和镜片焦斑 PSF 各有自己的测量记录。

实测数值在同文主文、补件或作者答复之间冲突时，可用 `alternative_reports` 保存至少两个不同原值及各自的 `source`、`location`、`basis` 和 `note`。主格用 `value: null`、`basis: unresolved`，`display` 保留原值和来源标签，引用列表绑定所有报告。散点仅纳入选定的数值格。

同文原作者专利中的实验可补充原刊材料，必须按原刊明确关联号及重复图证核实归属，来源标为作者专利并归同一 `publication_source`，不当作另篇期刊、正式补件或原始数表。若光学测量仅明确 NA、波长而未确认实物身份，不复制别的配置的口径或焦距；单设测量配置并说明身份待核。`mtf_kind: author_reported_directional_mtf_curve` 指正文称实测但算法未给的独立切向/弧矢曲线；用原物理频率单位和方向，未知计算、归一化及原数组留空，不创造截止频率或固定频率MTF点。若某一 FWHM 的对应波长存在原文冲突，保留图内印字及单位在 `display`/`original_value`，数值轴与波长数值保持空缺，清楚区分其他已确认谱点。
