# Chang 2024：400μm器件MTF公开性核查

核查日期2026-11-14；任务QUALITY-001d；分支`codex/chang-mtf-source-audit`；基线`1ca70a4`。本次按用户指定问题补已有研究，不新增文献编号或虚增器件数。入选理由：已有400μm、名义NA0.02、全可见光实制器件，SI明确有由实测PSF计算的MTF，直接对应当前研究问题。未用引用量或期刊影响因子筛选。

结论：在下列实际检查的公开入口中，只核到作者MTF曲线，未找到弧矢/切向数值表、原始二维PSF及足够的采样与处理元数据。主文明确要求向通讯作者合理请求数据。此结论是有范围的检索结果，不是全网不存在数据的证明；未联系作者。作者数表、原始PSF、自行重算MTF在数据库中均为`null`，未数字化曲线。

## 方法、器件与图表

| 核验项 | 原始位置与结果 |
| --- | --- |
| 主文与器件归属 | [正式主文](https://www.nature.com/articles/s41467-024-53701-8)，DOI 10.1038/s41467-024-53701-8；PDF p.5制备与聚焦表征、pp.5–7成像段、Fig.3D、SI Fig.S6图注明确是400μm/名义NA0.02器件；设计焦面12.5mm。沿用`study_id=chang2024`、`specimen_id=d400`。 |
| 实际测量波长 | SI Fig.S6 p.17七面板：400、450、500、550、600、650、700nm。作者声明连续400–700nm工作，与七个实际采样波长分别保留。 |
| 数据性质 | SI Note S5 p.6：相机捕获二维PSF，作二维Fourier transform后取模；属于**作者由实测计算**，不记为本库复算。 |
| 方向 | Fig.S6：蓝线MTF-Tangential，橙线MTF-Sagittal，黑线MTF-Ideal；未报告方向与相机x/y的对应关系。 |
| 横轴 | Spatial Frequency (cycles/mm)，标注0、50、100；不读取曲线上单点、不估计MTF50或截止频率。S5讨论57lp/mm条纹靶，不当成精确数值MTF测点。 |
| 纵轴、归一化 | MTF (a.u.)，显示0–1。公开方法未给零频归一化公式，不能仅凭曲线从1开始就补写算法。 |
| 场点与评价面 | 聚焦表征所得PSF；未报告场角/像高、方向坐标定义及每波长采用峰值焦面还是共同固定焦面的明确规则。不能当作全场MTF，也不能自行指定0°。 |
| 继像与采样 | 主文PDF p.8 Methods：10×/NA0.25物镜、200mm管镜、GigE单色CCD、沿轴扫描。相机具体型号、像元间距、有效放大率/物方μm每像素、轴向步长缺失；10×名义值不足以建立PSF数值频率轴。 |
| 处理条件 | 缺PSF数组、裁剪区域、暗场/背景处理、窗函数、补零、Fourier归一化、S/T截线与焦面选择规则；SI S4关于效率扣遮光背景的文字不能自动套给S5 MTF。 |

已视觉核SI p.17 Fig.S6和主文p.8；审稿PDF pp.20–21（内页17–18）也已视觉核。正式SI S5称600nm红通道，审稿回应正文称650nm，随后引用拟增补SI文字又写600nm；保留这个措辞差异，不据此改动七个面板的独立波长。RGB相机通道是宽谱响应，不能当成三个已标定单色MTF采样点。

## 数据入口与检索范围

均于2026-11-14核查；网页与公开API使用本机独立无头Google Chrome，不使用已有标签页或登录资料。Google搜索遇检查页后停止，改用搜索工具发现原始入口，再用无头Chrome核页面；未处理验证码。

| 入口 / 查询 | 实际结果及边界 |
| --- | --- |
| 正式主文Methods / [Data availability](https://www.nature.com/articles/s41467-024-53701-8#data-availability) / Supplementary information | 数据向通讯作者合理请求；附件目录只有MOESM1补充PDF及MOESM2审稿PDF，无Source Data链接、独立数据DOI或代码入口。 |
| [41467_2024_53701_MOESM1_ESM.pdf](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-024-53701-8/MediaObjects/41467_2024_53701_MOESM1_ESM.pdf) | 24页，S5 p.6和Fig.S6 p.17只有方法/曲线；未找到MTF数表、原始PSF文件或仓库链接。与用户本地SI SHA256相同，PDF无嵌入附件。主文Fig.3D排版PSF图不能当原始相机数组。 |
| [41467_2024_53701_MOESM2_ESM.pdf](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-024-53701-8/MediaObjects/41467_2024_53701_MOESM2_ESM.pdf) | 读Reviewer #1问题4–5及作者对应回应、搜索data/MTF/PSF/仓库入口；内容为讨论、排版图像与曲线，未提供数表/原始PSF。PDF无嵌入附件。 |
| 作者实验室[NanoLight Publications](https://nanolight.psu.edu/publications/) | 该论文条目只列Link（正式DOI）和SOM（同一MOESM1），未列作者数据仓库。未将同团队其它研究仓库冒充该文数据。 |
| [DataCite关联DOI查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-024-53701-8%22&page%5Bsize%5D=25)及[论文后缀查询](https://api.datacite.org/dois?query=%22s41467-024-53701-8%22&page%5Bsize%5D=25) | 两次均HTTP200、total=0；只能排除被这些查询命中的记录，不能覆盖没有关联DOI的所有数据。 |
| [Zenodo DOI后缀查询](https://zenodo.org/api/records?q=%22s41467-024-53701-8%22&size=10) | HTTP200、hits.total=0。 |
| GitHub公开仓库搜索 | 查询`"dispersion-matched"`及`"Achromatic metalenses for full visible spectrum"`，HTTP200、total_count=0、incomplete_results=false。只查仓库元数据，没有冒称已搜索全部代码或私有仓库。 |
| Figshare API | `POST /v2/articles/search`，search_for=`s41467-024-53701-8`，HTTP403，记为未能核查，不记为无结果。 |
| 搜索引擎定向查找 | DOI/精确题名 + data/github/zenodo；DOI限定figshare.com、zenodo.org、github.com、scholarsphere.psu.edu、data.psu.edu；作者Shengyuan Chang/Xingjie Ni + metalens/data。未找到可归属本论文的数值数据入口；同名复旦化学研究者排除。 |

Europe PMC DOI索引确认同一研究为PMC11544246，只用于核对版本入口，未以索引字段代替原文数据。未从审稿人估读值或其它研究制造MTF数表。

## 仍需的原始材料与复算边界

最小补证包：七波长的S/T频率–MTF表，或对应原始二维PSF；各文件的器件、波长、偏振、场点、方向、评价焦面；物方像素尺度及轴向采样；背景/裁剪/窗函数/补零/归一化与截线程序。若将来取得PSF并复算，另立`derived_from_measurement`测量记录，注明本库计算、输入文件与校验值，不覆盖作者曲线数据。

12.5mm→12500μm保持既有转换；MTF无量纲，空间频率cycles/mm。没有依据将MTF换算CPD、cycles/pixel或推算精确截止频率；没有把聚焦近似消色差推成全场无横向色差。数据新增两份同研究材料引用，论文/器件/记录数不变。

原始文件不上传公开仓库。重新下载SI SHA256=`ffd9cd70b5cce3039855dd285bcc51036ff133273a593c5de54bf3cefec328c0`；审稿PDF SHA256=`3e0e223c5ce5fb30ea765e507fc836ab4fd2019130b90830e1c5284ed1aeb12d`。

## 接续：Lin 2025两器件焦距缺口

QUALITY-001e已接着核查[Lin正式主文](https://www.nature.com/articles/s41377-024-01731-8)及本地SI DOCX。入选理由为用户指定目录中的既有研究缺口、NA0.9/0.7实制器件及650/700nm可见光测量，不以新增同文谱点虚增研究。

主文Fig.2b–e是数值模拟，Fig.2e焦距曲线不能转录为实测；NA0.9实际PSF在Fig.3b/c，NA0.7在SI Fig.S5a/b。未核到逐波长实测焦距、参考波长/焦面明确的焦移数表，不能由白色焦面线估读或由几何反推后冒充实测。主文p.9 Data availability称额外数据可向通讯作者请求；正式页面只列MOESM1 DOCX，无Source Data。已将两个配置、10条既有谱点的焦距证据边界及缺失条件补入`chromatic`，保留原有FWHM和效率数值，实测焦距仍空缺。主文/SI共用原文献编号；本批没有新增数值测量。

下一篇沿Chang原作参考文献20接Chen 2019（10.1038/s41467-019-08305-y）：可见光、偏振不敏感实测研究，当前文献域未收录；先查其Source Data与逐波长焦距/PSF/效率，避免重复Chen 2018。未用综述参数替代原作。

## 校验与发布

结构校验、145项测试、构建通过；当前无新增数值点，既有10研究/27配置/82行、可见光7研究/29行不变。PR、Pages版本及独立Chrome的新增证据、散点读数、原始引用往返验收在发布后补记。
