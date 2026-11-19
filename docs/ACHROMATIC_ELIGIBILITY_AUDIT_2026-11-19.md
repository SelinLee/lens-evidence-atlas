# 消色差超透镜正式标题与摘要准入复核

2026-11-19 复查矩阵中全部 55 篇，依据为正式标题或作者摘要对本文器件色差校正、消色差设计或不同波长同焦的明确表述。部分校正保留原作者限定。只在背景出现相关词，以及宽带、全彩、长焦深或计算恢复等单独描述，不能替代这一依据。同一合格论文的对照器件仍用于对应的比较。普通色散参照和独立评估类论文移出矩阵。

35 篇由正式标题判定，另对 20 篇核作者摘要。独立无头 Google Chrome 从 Crossref、OpenAlex 取得发布摘要或索引，摘要不完整或措辞有歧义的论文再与期刊、作者正式存档和 PubMed 对照。10 篇随同 77 个配置、887 条记录移出，共保留 45 篇、247 个配置、1064 条。可见光筛选为 38 篇、766 条。该轮复核应用新的标题或摘要门槛，三年与分区及经典引用门槛继续按项目目标执行。移出的表格与原始材料绑定可在原数据库快照追溯。[复核前数据库](https://github.com/SelinLee/lens-evidence-atlas/blob/bc72d96c1c69fc7a8cb0f4f3c59d0c087e6b12d6/data/devices.json) · [持续研究目标](LOCAL_RESEARCH_GOAL.md)

## 未通过准入的 10 篇

| 正式论文 | 记录数 | 判定依据 |
| --- | ---: | --- |
| [Neural nano-optics for high-quality thin lens imaging](https://doi.org/10.1038/s41467-021-26443-0) | 1 | 标题与摘要报告神经纳米光学成像和联合重建。摘要提到像差限制和全彩成像，未明确报告所研究器件的消色差校正。 [作者摘要](https://api.crossref.org/works/10.1038/s41467-021-26443-0) |
| [How good is your metalens? Experimental verification of metalens performance criterion](https://doi.org/10.1364/OL.394680) | 1 | 摘要将性能指标用于评估工作谱宽，并将消色差透镜列作未来适用对象。独立的通用评估文献。 [作者摘要](https://api.crossref.org/works/10.1364/OL.394680) |
| [Inverse design enables large-scale high-performance meta-optics reshaping virtual reality](https://doi.org/10.1038/s41467-022-29973-3) | 19 | 标题为大尺度逆设计，摘要写像差校正和多色聚焦，未明确给出色差校正或多色同焦。正文 Fig. 3 确实报告 RGB 消色差实物。此次按用户指定的标题或摘要门槛移出。 [作者摘要](https://www.nature.com/articles/s41467-022-29973-3) |
| [Beating spectral bandwidth limits for large aperture broadband nano-optics](https://doi.org/10.1038/s41467-025-58208-4) | 439 | 摘要以色差为研究背景，报告平面光学与计算重建联合设计的可见光宽带成像。缺当前器件明确色差校正或共焦的摘要表述。 [作者摘要](https://api.crossref.org/works/10.1038/s41467-025-58208-4) |
| [Metasurface optics for full-color computational imaging](https://doi.org/10.1126/sciadv.aar2114) | 26 | 核 PubMed 正式摘要全文。消色差一词指向既有工作的背景，本文报告光谱近不变 PSF 和单滤波器重建。 [作者摘要](https://pubmed.ncbi.nlm.nih.gov/29487913/) |
| [De-occluding broadband metalens](https://doi.org/10.1038/s41467-026-76606-0) | 306 | 摘要的核心为通阻带分光、去遮挡及图像重建。未在标题或摘要声明色差校正。 [作者摘要](https://api.crossref.org/works/10.1038/s41467-026-76606-0) |
| [Inverse designed extended depth of focus meta-optics for broadband imaging in the visible](https://doi.org/10.1515/nanoph-2021-0431) | 44 | 摘要报告长焦深、约 290 nm 内 PSF 稳定及计算后处理。缺色差校正或同焦的明确表述。 [作者摘要](https://api.crossref.org/works/10.1515/nanoph-2021-0431) |
| [Inverse Designed Metalenses with Extended Depth of Focus](https://doi.org/10.1021/acsphotonics.9b01703) | 25 | 摘要是约 625 nm 单谱点的柱面长焦深验证。 [作者摘要](https://api.crossref.org/works/10.1021/acsphotonics.9b01703) |
| [Modal contrast engineering in ultraviolet and visible metalenses enabled by material-selective hybridization](https://doi.org/10.1038/s41467-026-74547-2) | 14 | 标题及摘要报告材料选择性涂层、紫外和可见光的宽带效率与焦斑。原文 Fig. 4 前说明几何相位色散使焦距变化，审稿回复记 RGB 各自调焦。 [作者摘要](https://pmc-oa-opendata.s3.amazonaws.com/PMC13444320.1/PMC13444320.1.pdf#page=1) |
| [Multiwavelength polarization-insensitive lenses based on dielectric metasurfaces with meta-molecules](https://doi.org/10.1364/optica.3.000628) | 12 | 校方存档摘要提到色差背景和 915／1550 nm 同时工作，未明确说校正色差或共焦。此项是 Optica 超分子论文，与另一个 Optics Express 双波长研究分属不同 DOI。 [作者摘要](https://authors.library.caltech.edu/records/32je3-2pw19) |

Seong 的上一版报告以普通色散研究作独立参照。主文 §Diffraction-limited metalenses 给可见光 450 nm 及 635 nm 的作者有效焦距分别为 14.5 和 10.2 mm。这两个值在色散设计段给出。透明评议 Response 1.4b 确认 RGB 在不同焦距采集。宽带效率和逐色焦斑可沿原核验笔记追溯。[正式版 pp.5–6](https://pmc-oa-opendata.s3.amazonaws.com/PMC13444320.1/PMC13444320.1.pdf#page=5) · [评议材料 p.16](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-026-74547-2/MediaObjects/41467_2026_74547_MOESM2_ESM.pdf#page=16) · [原核验记录](SEONG_AND_LI_REVIEW_2026-11-18.md)

## 经摘要复核后保留的 10 篇

| 正式论文 | 原文符合门槛的证据 |
| --- | --- |
| [Twin-Lever Multifunctional Meta-Optics With High Longitudinal Tolerance](https://doi.org/10.1002/advs.77477) | 摘要说明实现消色差双模式成像，并报告实测表征支持抑制色差的聚焦。 [作者摘要](https://api.crossref.org/works/10.1002/advs.77477) |
| [Asymptotic dispersion engineering for ultra-broadband meta-optics](https://doi.org/10.1038/s41467-023-42268-5) | 摘要明确报告实制单层消色差超透镜及 400–1000 nm 设计范围。 [作者摘要](https://api.crossref.org/works/10.1038/s41467-023-42268-5) |
| [Disordered mosaic metasurfaces with scalable functional density](https://doi.org/10.1038/s41467-026-71774-5) | 摘要明示实制消色差透镜及 1200–1400 nm 范围。 [作者摘要](https://api.crossref.org/works/10.1038/s41467-026-71774-5) |
| [Dispersion-engineered spin photonics based on folded-path metasurfaces](https://doi.org/10.1038/s41377-025-01850-w) | 摘要将消色差聚焦列为折叠光路方案实现的功能。 [作者摘要](https://api.crossref.org/works/10.1038/s41377-025-01850-w) |
| [Two-Photon Microscopy with a Double-Wavelength Metasurface Objective Lens](https://doi.org/10.1021/acs.nanolett.8b01737) | 摘要写明透镜为 820 nm 和 605 nm 设计共同焦距，工作谱点按实际数据另记。 [作者摘要](https://api.crossref.org/works/10.1021/acs.nanolett.8b01737) |
| [Controlling the sign of chromatic dispersion in diffractive optics with dielectric metasurfaces](https://doi.org/10.1364/OPTICA.4.000625) | 摘要报告聚焦反射镜实现零色散设计，并报告另一原型的色散降低五倍。 [作者摘要](https://api.crossref.org/works/10.1364/OPTICA.4.000625) |
| [Aberration-corrected large-scale hybrid metalenses](https://doi.org/10.1364/optica.434040) | 摘要明示厘米级折超混合镜补偿色散，并报告至少 80% 色差校正。 [作者摘要](https://api.crossref.org/works/10.1364/optica.434040) |
| [Minimalist optical system for achromatic imaging within extended field of view based on monolithic integrated meta-axicon cluster](https://doi.org/10.1038/s41377-026-02272-y) | 标题写明消色差成像，摘要进一步说明离轴消色差 meta-axicon 及重建阶段。 [作者摘要](https://api.crossref.org/works/10.1038/s41377-026-02272-y) |
| [Metasurfaces based dual wavelength diffractive lenses](https://doi.org/10.1364/OE.23.003928) | 摘要明确将两个波长聚焦于单个焦点，偏振条件保留。 [作者摘要](https://api.crossref.org/works/10.1364/OE.23.003928) |
| [Multispectral optical metasurfaces enabled by achromatic phase transition](https://doi.org/10.1038/srep15781) | 摘要明确描述离散多波长的焦斑同位置，并有另一试样的双色同面焦斑。实物逐色峰位仍待补。 [作者摘要](https://api.crossref.org/works/10.1038/srep15781) |

## 由正式标题直接判定的 35 篇

- [Broadband achromatic dielectric metalenses](https://doi.org/10.1038/s41377-018-0078-x)
- [High‐Index, Low‐Loss Optical Material Platforms for Ultra‐Broadband Ultraviolet‐to‐Visible Achromatic Metalenses](https://doi.org/10.1002/adfm.75854)
- [A broadband achromatic metalens in the visible](https://doi.org/10.1038/s41565-017-0052-4)
- [A broadband achromatic metalens for focusing and imaging in the visible](https://doi.org/10.1038/s41565-017-0034-6)
- [A hybrid achromatic metalens](https://doi.org/10.1038/s41467-020-17646-y)
- [High-performance achromatic flat lens by multiplexing meta-atoms on a stepwise phase dispersion compensation layer](https://doi.org/10.1038/s41377-024-01731-8)
- [Achromatic metalenses for full visible spectrum with extended group delay control via dispersion-matched layers](https://doi.org/10.1038/s41467-024-53701-8)
- [Roll-to-plate printable RGB achromatic metalens for wide-field-of-view holographic near-eye displays](https://doi.org/10.1038/s41563-025-02121-0)
- [A broadband achromatic polarization-insensitive metalens consisting of anisotropic nanostructures](https://doi.org/10.1038/s41467-019-08305-y)
- [Meta-optics achieves RGB-achromatic focusing for virtual reality](https://doi.org/10.1126/sciadv.abe4458)
- [Hybrid achromatic microlenses with high numerical apertures and focusing efficiencies across the visible](https://doi.org/10.1038/s41467-023-38858-y)
- [Achromatic metalens array for full-colour light-field imaging](https://doi.org/10.1038/s41565-018-0347-0)
- [On-chip integration of achromatic metalens arrays](https://doi.org/10.1038/s41467-025-62539-7)
- [A broadband achromatic metalens array for integral imaging in the visible](https://doi.org/10.1038/s41377-019-0178-2)
- [Achromatic Metalens over 60 nm Bandwidth in the Visible and Metalens with Reverse Chromatic Dispersion](https://doi.org/10.1021/acs.nanolett.6b05137)
- [Differentiable library-based inverse design of achromatic metalens for full-color near-eye displays](https://doi.org/10.1038/s41467-026-73103-2)
- [3D-printed multilayer structures for high–numerical aperture achromatic metalenses](https://doi.org/10.1126/sciadv.adj9262)
- [Achromatic Metasurface Lens at Telecommunication Wavelengths](https://doi.org/10.1021/acs.nanolett.5b01727)
- [Composite functional metasurfaces for multispectral achromatic optics](https://doi.org/10.1038/ncomms14992)
- [Full-Color Quasi-Achromatic Imaging with a Dual-Functional Metasurface](https://doi.org/10.1021/acs.nanolett.5c00695)
- [Octave bandwidth photonic fishnet-achromatic-metalens](https://doi.org/10.1038/s41467-020-17015-9)
- [An ultrabroadband 3D achromatic metalens](https://doi.org/10.1515/nanoph-2020-0550)
- [Millimeter-Scale Single-Layer RGB Achromatic Metalens via Time-Simultaneity-Free Design](https://doi.org/10.1002/lpor.72174)
- [An RGB-Achromatic Aplanatic Metalens](https://doi.org/10.1002/lpor.202300729)
- [RGB Achromatic Metalens Doublet for Digital Imaging](https://doi.org/10.1021/acs.nanolett.2c00486)
- [Broadband Achromatic Hybrid Metalens Module with 100° Field of View for Visible Imaging](https://doi.org/10.3390/s25103202)
- [Printable grayscale nano-template for full-colour organic light-emitting diode near-eye displays with 3D achromatic metalenses](https://doi.org/10.1038/s41467-026-73940-1)
- [Achromatic Varifocal Metalens for the Visible Spectrum](https://doi.org/10.1021/acsphotonics.9b00523)
- [High-efficiency broadband achromatic metalens for near-IR biological imaging window](https://doi.org/10.1038/s41467-021-25797-9)
- [Simultaneous Achromatic and Varifocal Imaging with Quartic Metasurfaces in the Visible](https://doi.org/10.1021/acsphotonics.9b01216)
- [Broadband achromatic optical metasurface devices](https://doi.org/10.1038/s41467-017-00166-7)
- [Vectorial Generalized Snell’s Law-Enabled Differentiable Ray Tracing for Large-Aperture Visible Achromatic Hybrid Meta-Optics](https://doi.org/10.1002/lpor.202500448)
- [Bandpass-filter-integrated multiwavelength achromatic metalens](https://doi.org/10.1364/PRJ.422280)
- [Broadband Achromatic Metasurface-Refractive Optics](https://doi.org/10.1021/acs.nanolett.8b03567)
- [RGB Achromatic Metalens for Neural Network-Enhanced High Resolution Digital Imaging](https://doi.org/10.1002/lpor.202500460)
