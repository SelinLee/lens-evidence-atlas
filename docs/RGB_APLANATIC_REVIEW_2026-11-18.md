# Li 2024 与 Feng 2022 高 NA 可见光 RGB 器件

核验日期 2026-11-18。Li 2024 入选是因为同一研究提供较高 NA 实制主镜和未校正球差的对照，以及逐色焦位、焦斑、效率和标靶成像。Feng 2022 沿 Hasegawa 2026 Table 1 的参考文献 46 和 Li 2024 补充材料参考文献 A12 纳入，1 mm 双层实物和设计 NA 0.8 可作为高 NA 器件的尺寸对照。两篇均按 DOI 去重。本次未以引用数或影响因子筛选。[Li 2024](https://doi.org/10.1002/lpor.202300729) · [Feng 2022](https://doi.org/10.1021/acs.nanolett.2c00486)

## Li 2024 逐色焦位、焦斑和效率

主镜为 c-Si/熔融 SiO₂，直径 600 μm、设计 NA 0.635、设计焦距 365 μm。为有限共轭优化时，作者的物距 s=700 μm、像距 s′=1000 μm、基底厚度 400 μm、折射率 1.455。对照实物采用相同 NA 和设计焦距，单镜口径未单报。正入射测量用可调光源；采集物镜为 50×、NA 0.55。采样空间尺度、偏振、轴向扫描步长及复测次数待核。[正式版 pp2–5、p7](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/3ba82c34-8f68-4421-bd79-10665ff89ec1.pdf) · [补充材料 Fig. S8–S10](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/79af856e-d670-4d61-8797-5ad83919c64f.pdf)

| 波长 (nm) | 主镜实测 f (μm) | 相对设计 F=365 μm 的 Δz (μm) | 主镜 x-FWHM (nm) | 对照 x-FWHM (nm) | 主镜聚焦效率 (%) |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 490 | 365 | 0 | 588 | 560 | 1.52 |
| 530 | — | — | 942 | — | — |
| 570 | 369 | +4 | 842 | 669 | 2.70 |
| 630 | — | — | 1292 | — | — |
| 700 | 365 | 0 | 812 | 840 | 6.54 |

焦距和效率见正文 p4 §2.2，主镜 x 向宽度见 Fig. 3a–e 下行印字，对照见补图 S10d–f，Δz 由本库按 f−365 μm 计算。三 RGB 的作者相对焦位移动约 1%，具体分母未知。490–720 nm 是作者报告的正入射谱扫范围，RGB 外 530 和 630 nm 的正文只给相对偏差小于 10.7% 的界限，逐点绝对 f 留空。效率分子沿用作者的三倍 FWHM 面积内能量，分母为入射光能量，具体区域形状和计量光阑未报告。[原文 Fig. 3 与 §2.1–2.2](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/3ba82c34-8f68-4421-bd79-10665ff89ec1.pdf) · [补图 S10](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/79af856e-d670-4d61-8797-5ad83919c64f.pdf#page=14)

正入射下，主镜在 490 和 570 nm 的 x 剖面宽度大于对照，在 700 nm 小于对照。主镜各谱点用图示虚线截面，对照用共同黄色虚线截面。有限物距 Fig. S11 是物距 700 μm 的 Fresnel 模拟，三 RGB 主镜 x-FWHM 为 0.83、1.01、1.23 μm，对照为 1.44、1.70、2.13 μm。实拍 Fig. 4 以约 20 nm 带宽分别照明，作者辨认主镜 USAF G7/E6 的约 2.19 μm 线宽。对照只给共同界限大于 7.81 μm，未知逐通道阈值。铬膜靶和无滤光彩片记录了图像，未给场点对应的横向颜色位移。彩片光路在正文和 S12 图注分别指向 S9b 和 S9c，保留两处出处。[原文 Fig. 4 与实验方法](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/3ba82c34-8f68-4421-bd79-10665ff89ec1.pdf#page=6) · [补图 S11–S12](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/79af856e-d670-4d61-8797-5ad83919c64f.pdf#page=15)

20.4 μm FDTD 正入射模拟的三 RGB 聚焦效率为 1.58%、2.99%、4.66%。另一有限点源模型使用 s=10 μm、s′=30 μm。S5 的 z 向 FWHM 和作者球差 Δs/s′ 分别保存。490 nm 对照印字为 13.77 μm 和 44.56%，按同图标称像距 30 μm 换算为 45.90%，数据库保留两处原文读数与差异。[补图 S4–S5](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/79af856e-d670-4d61-8797-5ad83919c64f.pdf#page=7)

主文与 SI 从南开大学作者组取得，文件大小分别为 7,668,957 和 1,689,833 字节，8 页和 19 页，均无嵌入文件。SHA256 分别为 `f1f89aba8f65bb9ba3ee78f8be3043674710cfa8a740a1c353e373502f9fff3b` 和 `fc6f53b3a2b250a275182d5d38f7b9372aecffa55058840be424d7c3b8208032`。期刊 SI 原文件名为 `lpor202300729-sup-0001-SuppMat.pdf`，期刊直链返回 403。主文 p7 Data Availability 指向通讯作者合理请求。DataCite 精确关联查询为零项，按 DOI 检索作者项目、GitHub 和 Zenodo 未找到独立公开数组。已读材料中只有焦斑与图像，未获得 MTF、原始 PSF、尺度或处理参数，也未见可填数的 Strehl。精确图中标签入库，未对曲线数字化。[主文 p7 数据可用性](https://chenlab.nankai.edu.cn/_upload/article/files/c5/69/8c299a51483ea5789903f3712615/3ba82c34-8f68-4421-bd79-10665ff89ec1.pdf#page=7) · [DataCite 关联查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1002%2Flpor.202300729%22)

## Feng 2022 目前可核的器件几何

Nano Letters 22(10), 3969–3975，DOI 10.1021/acs.nanolett.2c00486。Europe PMC CORE 的 `resultList.result[0].abstractText` 末句核到 1 mm 双层实物及设计 NA 0.8。摘要未给逐色中心波长、实测焦距、有效 NA、FWHM、Strehl 或效率。ACS 主文、补充 PDF 和视频入口待取得。作者校方页只列题录，OpenAlex 只指向 DOI 与 PubMed，Crossref 未列开放数据关系，DataCite 按关联 DOI 和标题查询为零项，ACS Figshare 搜索页受限。厘米级和 TiO₂ 配置待读 SI 核身份。尚未向作者发出请求。[ACS 原文入口](https://pubs.acs.org/doi/10.1021/acs.nanolett.2c00486) · [作者发表摘要记录](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI%3A10.1021%2Facs.nanolett.2c00486&resultType=core&format=json) · [DataCite 关联查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1021%2Facs.nanolett.2c00486%22)

## 本批范围

Li 2024 共 40 条记录、13 个测量或模型配置，对应两只实制方案。Feng 2022 一只实物、一条摘要证据。全库 35 篇、187 个配置、1368 条记录。下一篇沿 Feng 对应作者的机构发表列表核 Zhang 2025 的 410 μm 实物、标靶和重建处理，继续并行寻找 Feng 2022 主文/SI。Chang 2024 的逐频或 PSF 缺口继续跟踪。[Zhang 2025](https://doi.org/10.1002/lpor.202500460)
