# Feng 2022 与 Pan 2023 原始资料补核

## Feng 2022 双层 RGB 超透镜

Feng 等的论文于 2022-05-04 正式上线。沿 Hasegawa 2026 Table 1 的参考文献 46 回查。该研究展示毫米级高 NA 双层 RGB 器件，2026-11-18 的 Crossref 和 OpenAlex 分别记录 101 次和 102 次引用，按经典研究纳入。[期刊 DOI](https://doi.org/10.1021/acs.nanolett.2c00486) · [Crossref](https://api.crossref.org/works/10.1021/acs.nanolett.2c00486) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1021/acs.nanolett.2c00486)

作者摘要末句给出 1 mm 口径与设计 NA 0.8。中山大学课题组页面末段描述方形和圆形纳米柱组成的双层结构及微投影动态显微成像。该页第二幅图 `(a)` 为结构示意，`(b)` 为器件表面实拍，`(c)` 为三基色“SYSU”数字成像。面板 `(b)` 的 200 μm 与 `(c)` 的 10 μm 均为比例尺。第一幅图属于另篇立体显微研究。此次保留同一文献、一只实物、一行记录，新增结构说明和图证。第二幅 PNG 为 702920 字节，SHA-256 `0320704d28f1cf94cd0e54b935c10f415d57505bae3a9ebe20a38ba5c8e6b004`。[作者摘要](https://pubmed.ncbi.nlm.nih.gov/35506587/) · [课题组报道](https://phys.sysu.edu.cn/article/221) · [第二幅原图](https://phys.sysu.edu.cn/sites/default/files/inline-images/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20221126202015.png)

Crossref 组件 `.s003` 的 `message.relation.is-component-of[0].id` 和 `message.resource.primary.URL` 将 `nl2c00486_si_003.pdf` 绑定到同一研究。`.s001` 为影片。期刊列补件含工艺、测量、厘米级及 TiO₂ 配置。独立无头 Chrome 检查 ACS 主文及补件均返回 HTTP 403，Figshare 两条精确 DOI 查询也返回 403。DataCite 精确关联检索无结果，Europe PMC 与 OpenAlex 未列可取得的开放全文，合作者的 USP 论文入口本次超时。主镜设计焦距、逐色波长与焦位、效率积分条件、PSF、MTF 和数据声明继续留待原作。厘米级和 TiO₂ 配置仍待核实其几何和验证阶段。[组件 DOI](https://api.crossref.org/works/10.1021/acs.nanolett.2c00486.s003) · [ACS 补件](https://pubs.acs.org/doi/suppl/10.1021/acs.nanolett.2c00486/suppl_file/nl2c00486_si_003.pdf) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1021%2Facs.nanolett.2c00486%22) · [USP 入口](https://teses.usp.br/teses/disponiveis/18/18155/tde-17032021-115322/publico/ThesisMartinsAugustoCorrected.pdf)

## Pan 2023 三维打印多层超透镜

正式发表于 2023-12-20，2026-11-20 仍在三年范围内。2025 年升级版中科院分区的综合性期刊大类一区。入选依据为同文两只 20 μm 高 NA 实制消色差器件及可见光轴扫。此次用独立无头 Chrome 从 PMC 开放对象存档取到两份正式文件，并核验图像及正文。[期刊](https://doi.org/10.1126/sciadv.adj9262) · [武汉大学分区条目](https://topj.lib.whu.edu.cn/show.asp?cat=zk&id=13083) · [带年份的分区条目](https://www.fabiao.com.cn/sci/23752548/)

| 正式文件 | 字节与 SHA-256 | 主要定位 |
| --- | --- | --- |
| [PMC10732525.1.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/PMC10732525.1.pdf) | 1244637 字节，`b4d75f56dd1a931583d9588daca1ad944c01aac3957bec0f6ec58b1065a3c288` | p.6 Fig. 3，p.7 Fig. 4，p.8 Methods，p.9 数据声明 |
| [sciadv.adj9262_sm.pdf](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/sciadv.adj9262_sm.pdf) | 2096272 字节，`98acf74961c14ab63598213980585c0d2a0d5f70303c7d39f9a633156bbadab1` | p.9 Fig. S7，p.11 Fig. S9，p.12 Fig. S10，p.13 Fig. S11 |

- Fig. 3A/B 报告 442、509、560、600、623、646 nm 的实测 `xz`、`xy` 与归一化横截线。Fig. 3C 横轴 `Wavelength (nm)`，纵轴 `z (μm)`。作者用星号画两只 MAM 的实测峰位，图注的 `z` 从样品顶部计。20 nm 是 Methods 的轴扫步长。作者的 `<3 μm` 仍保留为界限，参考波长、逐点印字数和几何焦距原点转换未给。[正式 Fig. 3](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/PMC10732525.1.pdf#page=6)
- Fig. 4A/B 在各 NA 所定义的焦面给效率与 FWHM。实测效率区间分别为 22.5–42.7% 和 13.3–22.1%。实验分母为移除器件后与 MAM 像面积匹配的入射功率，作者的名义积分区为直径 `3 × FWHM`。作者未给逐点数字与孔径标定对应。补件 Fig. S7A/B 仅报告 560 nm 的模拟 PSF 与 `fₓ (mm⁻¹)` MTF 曲线，横轴 0–800，纵轴 0–1。`IFT` 为图中标注，采样、处理、归一化及数表未找到。作者数据声明将支持结论的数据指向论文和补件。PMC 对象清单无独立 PSF、MTF 或逐色焦位表。[正式 Fig. 4](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/PMC10732525.1.pdf#page=7) · [Fig. S7](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/sciadv.adj9262_sm.pdf#page=9) · [PMC 对象清单](https://pmc-oa-opendata.s3.amazonaws.com/?prefix=PMC10732525)
- Fig. 4C 拍摄 USAF 第 6 组第 3 单元的数字 3，蓝光图与结果段标 450 nm，Methods 记 458 nm。正式 Fig. S9B 拍摄第 6 组第 5 和第 6 单元条纹，蓝光图内 450 nm、图注 458 nm。新增四条 S9B 条纹成像记录，沿用同一 NA 0.5 成像系统。绿 532 nm、红 633 nm 分别登记，两组蓝光的数值栏均留空。Fig. S10 的约 −5／0／+5 μm 是 Fresnel 对照的观察位置。新增图证没有提供横向色差、残余焦移或 MTF 数值。[Fig. S9](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/sciadv.adj9262_sm.pdf#page=11) · [Fig. S10](https://pmc-oa-opendata.s3.amazonaws.com/PMC10732525.1/sciadv.adj9262_sm.pdf#page=12)

## 2026-11-23 Feng 原始补件文件登记

ACS Figshare 的公开 OAI-PMH 与文件列表定位组件 `10.1021/acs.nanolett.2c00486.s003`、条目 19705298 v1、文件 34997879。登记 `nl2c00486_si_003.pdf` 为 13 页、904970 字节，MD5 `96979d46bae2d8bf8003e9fe214f7574`。条目 19705292 和 19705295 为两个影片组件。Figshare 预览、文件下载和 ACS 出版者入口未取得 PDF 字节。逐色焦位、PSF、MTF 与效率计量仍待查。[ACS 文件登记](https://widgets.figshare.com/public/articles/19705298/versions/1/files) · [Crossref 组件](https://api.crossref.org/works/10.1021/acs.nanolett.2c00486.s003)
