# 消色差超透镜原始校正证据复核

2026-11-19 复查矩阵中全部 55 篇。先核正式标题及摘要，遇有范围不明或版本措辞差异时核实正文、图表和补件。以对本文透镜或镜组实施光学消色差或色差校正的原始证据判定准入。部分校正保留原作者限定，同一合格论文的未校正对照仍随研究保留。

35 篇正式标题已逐条与书目登记对照，其余 20 篇核作者摘要及相关段落。PR #177 的首轮按标题和摘要移出 10 篇。用户随后确认正文有证据同样纳入，追核后恢复 2 篇、9 个配置、31 条记录，并移出一篇标题声明消色差成像但实测仍有明显焦移的研究。最终保留 46 篇、247 个配置、1063 条，可见光为 38 篇、753 条。保留档案可按原数据库快照追溯。三年、分区及经典引用门槛仍按项目目标执行。[复核前数据库](https://github.com/SelinLee/lens-evidence-atlas/blob/bc72d96c1c69fc7a8cb0f4f3c59d0c087e6b12d6/data/devices.json) · [持续研究目标](LOCAL_RESEARCH_GOAL.md)

## 全文复核后恢复的两篇

- **Li 2022** 实制 2 mm、NA 0.7 的离散 RGB 消色差超透镜。主文 Fig. 3c 给 488／532／658 nm 的实测轴向分布，正文报告最大焦差约 1.5 μm。Fig. 5c 对应 1 cm、NA 0.3，正文报告约 4.5 μm。Fig. 4c 的另一只六色、2 mm、NA 0.3 实物报告最大焦差 0.5 μm。恢复 4 个配置、19 条及原证据位置。摘要泛称像差校正和多色聚焦，具体色差校正由正文建立。[正式主文 pp.4–7](https://www.nature.com/articles/s41467-022-29973-3.pdf#page=4) · [原核验](LI_INVERSE_REVIEW_2026-11-14.md)
- **Arbabi 2016，Optica** 的馆藏网页摘要与所附正式 PDF 不同。独立无头 Chrome 重取校方存档正式版，印刷 p.628 摘要明确报告一只透射镜实现在 915／1550 nm 同焦距。主文 §4 Fig. 4c–d 和补件 Fig. S2 为实测图。成对精确峰位仍缺，补件只在低 NA 器件的 915 nm 印出 980 μm。恢复 5 个配置、12 条，归近红外离散消色差。[正式 PDF p.628](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628.pdf?download=1#page=1) · [原核验](ARBABI_METAMOLECULE_REVIEW_2026-11-19.md)

两篇均符合经典文献例外。2026-11-19 Crossref 查询 Li 267 次、Arbabi 452 次，同日 OpenAlex 分别为 349 次和 492 次。[Li 的 Crossref](https://api.crossref.org/works/10.1038/s41467-022-29973-3) · [Arbabi 的 Crossref](https://api.crossref.org/works/10.1364/optica.3.000628)

## 按原文证据移出的 9 篇

| 正式论文 | 记录数 | 判定依据 |
| --- | ---: | --- |
| [Neural nano-optics for high-quality thin lens imaging](https://doi.org/10.1038/s41467-021-26443-0) | 1 | 主文 Figs. 2–3 用固定像面的 PSF 比较联合优化与恢复效果，未确认最佳焦位色散经光学校正。此处保留全彩计算成像的证据边界。 [作者存档正式版](https://light.cs.princeton.edu/wp-content/uploads/2021/11/NeuralNanoOptics.pdf) |
| [How good is your metalens? Experimental verification of metalens performance criterion](https://doi.org/10.1364/OL.394680) | 1 | 摘要将性能指标用于评估工作谱宽，并将消色差透镜列作未来适用对象。独立的通用评估文献。 [作者摘要](https://api.crossref.org/works/10.1364/OL.394680) |
| [Beating spectral bandwidth limits for large aperture broadband nano-optics](https://doi.org/10.1038/s41467-025-58208-4) | 439 | 主文 pp.2–3、6 以延长焦区解释共用传感器面。主器件有轴扫 Fig. S12，多色对照 Fig. S9 为固定面图。已核材料没有给多色最佳焦位的校正证据。 [正式主文](https://pmc-oa-opendata.s3.amazonaws.com/PMC11953342.1/PMC11953342.1.pdf) |
| [Metasurface optics for full-color computational imaging](https://doi.org/10.1126/sciadv.aar2114) | 26 | 正文 Fig. 1D–E 将立方相位产生的长焦深解释为对焦移的容忍，评价固定面的光谱近不变 PSF 和单滤波器恢复。 [作者存档正式版](https://lamarr.ece.uw.edu/research/amlab/Papers_Journals/Shane_Full_color_imaging.pdf) |
| [De-occluding broadband metalens](https://doi.org/10.1038/s41467-026-76606-0) | 306 | 设计利用波长与焦深的关系去遮挡，Fig. 4 在两个对应物深比较通阻带的实测焦斑。已核证据用于光谱选通、去遮挡和重建。 [正式主文](https://pmc.ncbi.nlm.nih.gov/articles/PMC13575167/) |
| [Inverse designed extended depth of focus meta-optics for broadband imaging in the visible](https://doi.org/10.1515/nanoph-2021-0431) | 44 | 正文 §§1–2 延长焦区来保持传感面 PSF 相似，约 625 nm 轴扫验证焦深，宽带图经后处理。未确认最佳焦位色散经校正。 [正式主文](https://pmc.ncbi.nlm.nih.gov/articles/PMC11501592/) |
| [Inverse Designed Metalenses with Extended Depth of Focus](https://doi.org/10.1021/acsphotonics.9b01703) | 25 | 柱面长焦深的器件设计与实验在约 625 nm，正文 Table 1 给同谱点三种设计焦距。 [作者摘要](https://api.crossref.org/works/10.1021/acsphotonics.9b01703) |
| [Modal contrast engineering in ultraviolet and visible metalenses enabled by material-selective hybridization](https://doi.org/10.1038/s41467-026-74547-2) | 14 | 标题及摘要报告材料选择性涂层、紫外和可见光的宽带效率与焦斑。原文 Fig. 4 前说明几何相位色散使焦距变化，审稿回复记 RGB 各自调焦。 [作者摘要](https://pmc-oa-opendata.s3.amazonaws.com/PMC13444320.1/PMC13444320.1.pdf#page=1) |
| [Simultaneous Achromatic and Varifocal Imaging with Quartic Metasurfaces in the Visible](https://doi.org/10.1021/acsphotonics.9b01216) | 32 | 主文 Fig. 4 与正文明确报告显著的轴向色移。长焦深使固定评价面三色 PSF 近似，原始图各色模糊，经去卷积获得全彩成像结果。 [正式主文](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=5) |

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

## 从正式标题定位并保留的 34 篇

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
- [Broadband achromatic optical metasurface devices](https://doi.org/10.1038/s41467-017-00166-7)
- [Vectorial Generalized Snell’s Law-Enabled Differentiable Ray Tracing for Large-Aperture Visible Achromatic Hybrid Meta-Optics](https://doi.org/10.1002/lpor.202500448)
- [Bandpass-filter-integrated multiwavelength achromatic metalens](https://doi.org/10.1364/PRJ.422280)
- [Broadband Achromatic Metasurface-Refractive Optics](https://doi.org/10.1021/acs.nanolett.8b03567)
- [RGB Achromatic Metalens for Neural Network-Enhanced High Resolution Digital Imaging](https://doi.org/10.1002/lpor.202500460)
