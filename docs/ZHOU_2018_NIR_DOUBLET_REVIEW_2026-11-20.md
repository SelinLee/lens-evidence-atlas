# Zhou 2018 双层近红外消色差实验

Zhou 等，*Nano Letters* 18(12), 7529–7537，DOI `10.1021/acs.nanolett.8b03017`。2026-11-20 从 Chang 等的双层色散匹配技术公开文献关联追查，经 DOI 与题名去重。Crossref 的 `is-referenced-by-count` 为 274，OpenAlex 的 `cited_by_count` 为 294。经典研究的入选依据是 Fig. 4d 实物的两波长轴扫，以及正文对两主焦点焦距相同的描述。两实测谱点均在近红外。全部入口归同一文献编号。[期刊条目](https://doi.org/10.1021/acs.nanolett.8b03017) · [DOE OSTI 接收稿](https://www.osti.gov/servlets/purl/1491299) · [Crossref](https://api.crossref.org/works/10.1021/acs.nanolett.8b03017) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1021/acs.nanolett.8b03017) · [引文线索](https://patents.google.com/patent/US20250224542A1/en)

## 双层实物

接收稿正文 pp. 2–3 给出设计思路。用两层硅纳米柱的叠加相位分别匹配 1180 和 1680 nm 对应的聚焦波前，两色使用共同设计焦距。正文 pp. 5–6 给出实物口径 500 μm、设计焦距 540 μm、NA 0.42。空气中按口径和焦距计算的几何 NA 约 0.420。两层的名义柱高 750 nm、方形晶格周期 600 nm。熔石英上的第一层与经 PDMS 转移的第二层面对面贴合。作者由两层均在 20× 显微镜景深内给出约 5.8 μm 的间隔上界，实际间隔未量化。[接收稿设计](https://www.osti.gov/servlets/purl/1491299#page=3) · [接收稿制备](https://www.osti.gov/servlets/purl/1491299#page=6)

| 实测波长 | 焦斑 x 向 FWHM | 聚焦效率 | 原始位置 |
| --- | ---: | ---: | --- |
| 1180 nm | 1.74 μm | 38% | 正文 p.6 第 41–55 行、Fig. 4b 左列；p.7 第 10–17 行 |
| 1680 nm | 2.57 μm | 52% | 正文 p.6 第 41–55 行、Fig. 4b 右列；p.7 第 10–17 行 |

Fig. 4b 下图横轴为 x（μm），强度标度为 0–1。Fig. 4d 横轴为 z（μm）、纵轴为 x（μm），可见两色主焦在同一标称位置附近。Methods 说明沿传播方向扫约 300 μm，采集 267 张切片，间距 1.13 μm；50×、NA 0.42 接收物镜和近红外相机采集。作者另外报告 1180 nm 的弱次焦点位于 z=400 μm，并讨论约 3 μm 的两层横向错位。两主焦点的逐波长绝对峰位和残余焦差数值留空。横向色差、Strehl 和 MTF 未在已查材料中定位到数值或曲线。[接收稿 Fig. 4](https://www.osti.gov/servlets/purl/1491299#page=20) · [接收稿 Methods](https://www.osti.gov/servlets/purl/1491299#page=12)

Methods p.12 第 6–17 行定义效率。分子是通过焦斑共轭面虹膜的功率，虹膜直径为像方焦斑 FWHM 的 8 倍。分母按移除样片及全开虹膜后的总入射功率获得。用于效率测量的入射光束直径约 200 μm。原文未给绝对虹膜孔径、逐色功率读数、校准误差或重复次数。[接收稿效率测法](https://www.osti.gov/servlets/purl/1491299#page=13)

## 固定物距成像及其他配置

同一实物接筒镜，固定靶到超透镜距离 540 μm，在两个照明波长测 USAF 1951 靶。Methods 明确记有聚光物镜细调。作者报告两色均辨出所示第 6、7 组及对应线宽 7.81、3.91 μm。1180 nm 图像较模糊，作者提出反射鬼影与次焦点两个因素。该光路单列为一条成像配置。Fig. 4a,c,e,f 的 100 μm 双层器件与 Fig. 5b 的三层件为模拟。Fig. 5e 的实测分光器按设计横向分开三色焦点，留在筛查记录。[接收稿 Fig. 4–5](https://www.osti.gov/servlets/purl/1491299#page=20)

## 数据核查范围

使用本机独立无头 Google Chrome 取得 DOE OSTI 的 ACS 接收稿 PDF，3183176 字节，SHA-256 为 `a20e41716a00dad8ad58a57ab066b259ac0664b025bff7eea4d79563a56e058d`。PDF 共 27 页，首张为接收稿封面，正文页号比 PDF 小 1。视觉核对了 Fig. 4a–h。期刊主页面摘要及补件目录可经索引读取。Crossref 补件组件 DOI `10.1021/acs.nanolett.8b03017.s001` 登记文件 `nl8b03017_si_001.pdf`。Chrome 请求 ACS 主文与补件直链、Figshare DOI 查询返回 403，补件完整文件仍待取得。OSTI 条目目前提供接收稿，实验室发表目录指回 ACS。DataCite 精确关联 DOI 与 Zenodo 精确 DOI 查询均返回 0，OpenAlex 公开文本指向同一 OSTI PDF。已查范围内未定位 267 张扫描切片、横向物方采样尺度、轴向主峰表和计算 MTF 所需的原始 PSF。[期刊补件清单](https://pubs.acs.org/doi/full/10.1021/acs.nanolett.8b03017) · [补件组件登记](https://api.crossref.org/works/10.1021/acs.nanolett.8b03017.s001) · [OSTI 目录](https://www.osti.gov/biblio/1491299) · [作者实验室目录](https://valentineoptics.github.io/LabWebsite/publications.html) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1021%2Facs.nanolett.8b03017%22) · [Zenodo](https://zenodo.org/api/records?q=doi%3A%2210.1021%2Facs.nanolett.8b03017%22)
