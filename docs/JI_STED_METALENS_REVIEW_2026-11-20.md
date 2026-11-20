# Ji 2025 的 STED 双波长共焦超透镜

Ziheng Ji、Qinmiao Chen 等，*Multidimensional multiplexing metalens for STED microscopy*，DOI `10.1126/sciadv.adt2807`，*Science Advances* 11(17), eadt2807。期刊正式版页脚为 2025-04-23，PubMed Central 卷期日为 2025-04-25。由 Zang 与 Xia 2026 的参考文献 44 定位，核 DOI 后确认当批数据库尚未收录。2025 年 3 月中科院升级版为综合性期刊大类一区。Fig. 3D,G 的两色实测纵截面和补件 Fig. S5 的重叠图支持双波长共焦，满足入选条件。[主文](https://pmc.ncbi.nlm.nih.gov/articles/PMC12017330/) · [2025 年分区](https://www.ifabiao.com/sci/23752548/93.html)

## 同一镜片上的离散谱点

正式 pp.1–2 Eq. (1)–(3) 与 Fig. 1 描述直径 100 μm、设计 NA 0.8 的圆形 TiO₂ 超透镜。矩形双折射柱按传播相位与几何相位共同匹配 635 nm 右旋圆偏振（RCP）实心焦斑和 780 nm 左旋圆偏振（LCP）拓扑荷 1 的环形焦斑。两条相位式共用设计焦距变量。空气中以半径 50 μm 和 0.8 NA 代入圆锥几何得到 37.5 μm，可用于复核，设计页没有单独给出焦距数字。

| 入射 | 从超表面起的实测焦位 | 横向实测宽度 | 正式版位置 |
| --- | ---: | --- | --- |
| 635 nm RCP 激发 | 37.5 μm | 实心焦斑沿直径 FWHM 415 nm | p.3 实验段，Fig. 3D,E |
| 780 nm LCP 耗尽 | 37.5 μm | 环形焦斑内侧两半高交点间宽度 349 nm | p.3 实验段，Fig. 3G,H |

Fig. 3D,G 的下图为 x–z 归一化强度图，轴向均以 μm 标示，水平虚线穿过 z = 37.5 μm。Fig. 3E,H 的横轴 x 以 μm 表示，纵轴为强度任意单位，图内最大值约为 1。补件 pp.5–6 Fig. S4,S5 给出光路与 x–y、x–z 伪彩叠图，635 nm 实心光斑与 780 nm 暗心对齐。Fig. S4 的 50× 物镜和 100 mm 透镜承担缩束，纳米柱面朝样品，两束光经同一超透镜聚焦。Fig. 3 与 Fig. S5 的原始三维阵列、轴向采样步长、配准误差及两焦位的精度未给出，轴向残差和横向位移数值保留空白。环形内宽、实心焦斑 FWHM 及有限标本的成像截线分别录入。635 nm 的宽度与文中按 `0.51λ/NA` 给出的约 405 nm 衍射参考一致到约 2.5%。[正式 Fig. 3](https://pmc-oa-opendata.s3.amazonaws.com/PMC12017330.1/PMC12017330.1.pdf#page=4) · [补件 Fig. S4,S5](https://pmc-oa-opendata.s3.amazonaws.com/PMC12017330.1/sciadv.adt2807_sm.pdf#page=5)

## 聚焦、反向收集与系统成像

- 正式 p.4 将工作效率定义为焦区功率除以入射功率，实测 635 nm 为 32%，780 nm 为 37.8%。作者称测法与参考文献 21 相似。参考文献 21 的 Methods 明确自身采用半径 3×FWHM 的积分圆与镜片口径内入射功率。Ji 的论文及补件未给重复该积分圆的说明，环形光斑的积分半径和入射功率位置也待核。补件 Fig. S8a–d 给 1、100、200、300、400、500、600 mW 耗尽光条件下的横向剖面与效率柱状图，未给逐功率数值表。
- 同一段的 690 nm 指由 NA 0.8 物镜向超透镜焦点反向送入线偏振激光，取镜后 50 mm 的收集功率除以输入功率，结果 41.6%。这是反向收集测法。SI Fig. S3e 通过角谱模拟给出 690 nm 两圆偏振分量在激发焦面前 5 μm、后 7.5 μm 的偏移。690 nm 的实测正向焦位未报告。
- Fig. 4C 的 200 nm 荧光微粒样品表观线宽由 436 nm 降到 283 nm。Fig. 5C 的单条微管拟合线宽由 450 nm 降到 274 nm，正文未单独定义半高判据。二者是 STED 开关下的系统成像结果，采样步长均为 50 nm，分别用 2 ms 和 0.5 ms 驻留。补件 Fig. S7 提到另制一只无耗尽涡旋相位的饱和功率测试镜，该对照镜有独立的实验协议。

[原文效率与成像](https://pmc-oa-opendata.s3.amazonaws.com/PMC12017330.1/PMC12017330.1.pdf#page=4) · [荧光收集模拟](https://pmc-oa-opendata.s3.amazonaws.com/PMC12017330.1/sciadv.adt2807_sm.pdf#page=4) · [参考文献 21 的 Methods](https://www.nature.com/articles/s41467-021-25797-9)

## 原始材料入口

主文数据声明指向论文及其补件。PMC Open Access 的 `PMC12017330.1` 列有正文 PDF、XML、TXT、元数据、Fig. 1–5 的 JPG 及 `sciadv.adt2807_sm.pdf`，未列实验数组。DataCite 以正式 DOI 作关联标识返回 0 项。本轮尚未获得 PSF 数组、功率表、MTF 或 Strehl。核对的正式 PDF 为 2605612 字节，SHA-256 `9773ae198a6b8cf648ef966e3c8e0339939a139f145a907e622ffe277306d535`。补件 PDF 为 3048713 字节，SHA-256 `c12adcae801c460162d6d79dcd14fe56e8f2b45a7557bc434f50850185b1de5f`。[数据声明](https://pmc-oa-opendata.s3.amazonaws.com/PMC12017330.1/PMC12017330.1.pdf#page=7) · [PMC 文件清单](https://pmc-oa-opendata.s3.amazonaws.com/?prefix=PMC12017330.1) · [DataCite 关联检索](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1126%2Fsciadv.adt2807%22)
