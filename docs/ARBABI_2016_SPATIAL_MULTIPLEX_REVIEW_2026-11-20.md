# Arbabi 2016 空间复用超透镜的双波长实测

Ehsan Arbabi 等，*Scientific Reports* 6, 32803，2016-09-06，DOI `10.1038/srep32803`。沿 Zhou 2018 讨论的空间复用路线检索，经 DOI 与题名去重。本篇有两只近红外实物，Fig. 6 轴向光强图展示光学设计级次的双波长共焦。2026-11-20 查 Crossref 221 次、OpenAlex 237 次，按经典原始研究纳入。同期 *Optica* 的 meta-molecule 论文 DOI 为 `10.1364/optica.3.000628`，采用不同的单元布局和独立的实验记录。[原刊](https://doi.org/10.1038/srep32803) · [Crossref](https://api.crossref.org/works/10.1038/srep32803) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1038/srep32803)

## 实物与有限共轭

正式 PDF p.2 的 Experimental Results 给两只实物的口径 300 μm、设计 NA 0.46、镜焦距 286 μm。按 150 μm 半径和 286 μm 焦距作空气几何核算得 NA 约 0.465。两只都在熔石英上用 718 nm 厚的非晶硅制备。分区式把两谱点的设计放在交错径向扇区，交织式在 915 nm 母晶格上以每四个位置替换一个的方式引入 1550 nm 纳米柱。两种母晶格周期为 360 和 720 nm。两个离散实测谱点固定为 915／1550 nm。[正式 PDF pp.2–3](https://pmc-oa-opendata.s3.amazonaws.com/PMC5011735.1/PMC5011735.1.pdf#page=2)

单模光纤端面距约 500 μm 厚基底的背面 600 μm。器件表面至设计像面的距离是 400 μm。p.5 的近轴推算由 286 μm 镜焦距和 400 μm 设计像距给出约 1003 μm 的有效物距。设计级次的逐波长轴峰只见 Fig. 6，数值和剩余焦差均留空。横向色差和同场点波长变化未见原表。[正式 PDF p.5](https://pmc-oa-opendata.s3.amazonaws.com/PMC5011735.1/PMC5011735.1.pdf#page=5)

## 焦斑及功率比

| 实物 | 波长 | 实测 FWHM | 实测聚焦效率 | 作者理想相位掩模 FWHM |
| --- | ---: | ---: | ---: | ---: |
| 分区式 | 915 nm | 1.85 ± 0.05 μm | 37 ± 1% | 1.6 μm |
| 分区式 | 1550 nm | 3.3 ± 0.2 μm | 30 ± 1% | 2.75 μm |
| 交织式 | 915 nm | 1.85 ± 0.05 μm | 10 ± 0.5% | 1.6 μm |
| 交织式 | 1550 nm | 3.3 ± 0.2 μm | 58 ± 1% | 2.75 μm |

正式 PDF p.6 的 Table 1 与 Table 2 分别列聚焦功率比和焦斑宽度，实物用 `Measured` 列，理想 FWHM 用 `Limit` 列。作者未说明实测宽度的提取方向、± 的统计定义和样本量。交织样片 915 nm 的 FWHM 按该波长的实测表项保留，作者未为两级次分别给出宽度。模拟表项用全部尺寸与距离缩小四倍的 FDTD 配置，不载入对应实物的测量字段。[正式 Fig. 6 与 Tables 1–2](https://pmc-oa-opendata.s3.amazonaws.com/PMC5011735.1/PMC5011735.1.pdf#page=6)

效率分母为光纤输出功率。915 nm 以设计级次焦面上直径 20 μm 的针孔取功率。1550 nm 以放大继像共轭面 2 mm 直径虹膜取功率，作者折算原焦面约 20 μm。两套光路如 Fig. 5b、c。p.7 讨论将交织镜 915 nm 的 10% 归于设计级次能量降低。Fig. 6i 在 915 nm 显示较强高阶焦，作者报其距超透镜表面约 **220 μm**，峰值强度和焦区光功率分别约为同波长设计级次的 **1.8 倍和 1.2 倍**。保持同一器件，另列该测量条件。高阶焦的绝对效率和独立 FWHM 未报告。[正式 PDF pp.4–5](https://pmc-oa-opendata.s3.amazonaws.com/PMC5011735.1/PMC5011735.1.pdf#page=4) · [Discussion p.7](https://pmc-oa-opendata.s3.amazonaws.com/PMC5011735.1/PMC5011735.1.pdf#page=7)

## 公开数据核查

视觉核对正式版 p.6 Fig. 6 及两表。分区实测对应 a–d，交织实测对应 i–l。轴向强度图显示 y–z 视图，z 单位为 μm，颜色标度 0–1、任意单位。其他小图标尺 4 μm。p.4 说明约 100× 显微成像，1550 nm 轴向图去除超过自由空间传播常数的空间频率以压低相机响应不均。主文未给逐轴切片位置、物方像素尺度、未过滤强度矩阵、MTF 或 Strehl 数值。[正式 Fig. 6](https://pmc-oa-opendata.s3.amazonaws.com/PMC5011735.1/PMC5011735.1.pdf#page=6)

独立无头 Google Chrome 取得 CaltechAUTHORS 与 PMC 云存档的同版 PDF，953337 字节，SHA-256 均为 `ff3fddbd471bc44ee68c592ba0e9ffe6ead8043992774e0d5a00fdd282ad99f1`。Caltech 条目只附正式 PDF。PMC 开放清单有 16 个对象，包括六幅主图、六个公式图和四个正文及元数据文件。2026-11-20 查 DataCite DOI 关联、Zenodo DOI 和 CaltechDATA 精确题名，三个查询均返回 0。已查范围没有定位原始 PSF、MTF 数表或可独立验证两个级次的逐色像距数列。[CaltechAUTHORS](https://authors.library.caltech.edu/records/2n3j9-sm734) · [PMC 文件清单](https://pmc-oa-opendata.s3.amazonaws.com/?prefix=PMC5011735.1) · [DataCite DOI 关联](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fsrep32803%22) · [Zenodo DOI](https://zenodo.org/api/records?q=doi%3A%2210.1038%2Fsrep32803%22) · [CaltechDATA 题名](https://data.caltech.edu/api/records?q=metadata.title%3A%22Multiwavelength%20metasurfaces%20through%20spatial%20multiplexing%22)
