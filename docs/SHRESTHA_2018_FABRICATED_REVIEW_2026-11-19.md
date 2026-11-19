# Shrestha 2018 宽带介质超透镜实物补证

Shrestha、Overvig、Lu、Stein、Yu 的 `Broadband achromatic dielectric metalenses` 发表于 *Light: Science & Applications* 7, 85，2018-11-07。沿 Balli 2020 参考文献 15 复核。Crossref 718 次、OpenAlex 849 次，均在 2026-11-19 查询。经典例外的准入证据来自四只实际制作的非晶硅透射式镜片及其多波长轴扫。主文 pp.2–5、Eq. 1–3 和 Figs. 1–2 描述通过参考相位与不同截面单元扩展可用相位和色散空间，再按目标焦面优化。Fig. 3 与 Fig. 4 的轴向强度分布支持实际消色差。 [原文](https://www.nature.com/articles/s41377-018-0078-x.pdf) · [Crossref](https://api.crossref.org/works/10.1038/s41377-018-0078-x) · [OpenAlex](https://openalex.org/W2899838062)

## 实物几何与实测波长

四只实物用同一个文献编号。设计几何与连续工作带定位到出版方原始 DOCX `41377_2018_78_MOESM1_ESM.docx` 的 Table S1，图示谱点来自正式主文 PDF 实印页 6–7。M2、M3 的表值也见主文 p.5，图注的 NA 值不同。数据库显示两个出处并将这两只的单值 NA 坐标留空。 [Table S1](https://static-content.springer.com/esm/art%3A10.1038%2Fs41377-018-0078-x/MediaObjects/41377_2018_78_MOESM1_ESM.docx) · [Fig. 3](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=6) · [Fig. 4](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=7)

| 样品 | 口径 / 设计焦距 (μm) | 名义 NA | 设计工作带 (nm) | 实测面板印字波长 (nm) |
| --- | --- | --- | --- | --- |
| M1A | 100 / 200 | 0.24 | 1300–1650 | Fig. 3c。1300、1360、1420、1480、1510、1570、1630、1660 |
| M1B | 100 / 200 | 0.24 | 1200–1650 | Fig. 3d。1200 至 1650，每 50 nm 一点，共 10 点 |
| M2 | 200 / 800 | S1 0.13，Fig. 4b 0.12 | 1200–1650 | Fig. 4b。1200 至 1650，每 50 nm 一点，共 10 点 |
| M3 | 100 / 30 | S1 0.88，Fig. 4c 0.85 | 1200–1400 | Fig. 4c。1200、1250、1300、1350、1400 |

M1A 的 1660 nm 为 Fig. 3c 明示的实测波长，Table S1 的设计上限为 1650 nm。以几何关系 `NA = (D/2)/sqrt((D/2)^2 + f^2)` 复核量级，M1A/M1B 约 0.243，M2 约 0.124，M3 约 0.857。该计算依赖空气、圆形几何瞳和简化焦距关系。两处作者 NA 差异的具体定义仍待确认。 [主文 pp.5–7](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=5)

## 原始性能证据

Fig. 3c、d 和 Fig. 4b、c 给实测轴向 x–z 与横向 x–y 强度。Fig. 3c、d 横向图按作者图注采用设计目标焦面。Fig. 5a、b 给 M1B 在 1200、1300、1400、1500、1600 nm 的横向图、水平与垂直截线、理想 Airy 对照。截线横轴为 μm，纵轴为归一化强度。Methods pp.9–10 以器件平面初始化 z，典型扫描步长 1 μm，逐色对焦金纳米结构校正转接成像光路本身的色差。图像初始数组、物方像元采样、逐点最佳焦位及取峰细则待补。 [原文 Fig. 5](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=8) · [光学测量方法](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=10)

Fig. 5c–f 的横轴均为波长（μm），纵轴依次为焦位 Z（μm）、聚焦效率（%）、FWHM（μm）、Strehl 比。作者对四只器件概述最大偏离各自均值落在 2%–5%。M1B 和 M2 的 Strehl 大于 0.8 为文中报告界限。M3 的 NA 超过效率装置范围，作者在 Fig. 5d、f 省略其效率和 Strehl。p.7 说明焦面圆积分，半径为数倍 FWHM；p.10 给实验光阑为 3–5 倍 FWHM，未明确倍数对应半径或直径及各器件逐点设置。入射功率以裸石英区、同口径光阑测得。逐点焦距、效率、FWHM 与 Strehl 的确切数值留空。 [Fig. 5](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=8) · [效率测量方法](https://www.nature.com/articles/s41377-018-0078-x.pdf#page=10)

## 原始数据入口核查

- 出版方正式 PDF 6603273 字节，SHA-256 为 `2e7c023a8ea780c7044ccb361f2a1b24f53c10cc64cdc424e77c4c65d77a3cf8`。出版方 DOCX 8764573 字节，SHA-256 为 `4628e2515c068694f200d60bd65c64beff2092679ed5dd309f74574c6e56d3fc`。DOCX 含 Table S1 与嵌入图像，未含 Fig. 5 性能表或 MTF 数据。PubMed Central 公开主页挂同名补件，独立无头 Chrome 下载该镜像返回 403，出版方文件可访问。 [PMC 附件索引](https://pmc.ncbi.nlm.nih.gov/articles/PMC6220161/#Sec13)
- DataCite 用主文 DOI 查精确关联返回零项。Crossref 的 `.s001` 组件入口返回 404。Stevens 馆藏只核到文献入口。PMC 公开主文及出版方补件范围内未见相机图像、逐频 MTF、逐点光谱性能数表。Europe PMC 全文 XML 请求超时。 [DataCite 查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41377-018-0078-x%22) · [Stevens 条目](https://researchwith.stevens.edu/en/publications/broadband-achromatic-dielectric-metalenses/)
- Overvig 学位论文第 2 章可检索的内容复现同组样品及 NA 图注差异；核原件检索的 Fig. 2.3–2.5 相关文本。两位作者的哥伦比亚大学馆藏页尚未取得可用的学位论文下载链接。 [Overvig 存档](https://files.core.ac.uk/download/267804737.pdf) · [Shrestha 馆藏 DOI](https://doi.org/10.7916/d8-zp06-6d47) · [Overvig 馆藏 DOI](https://doi.org/10.7916/d8-q8r7-8s90)
