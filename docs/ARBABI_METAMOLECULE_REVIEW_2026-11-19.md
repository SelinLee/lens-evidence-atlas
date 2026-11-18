# Arbabi 2016 的双波长透射超透镜

Ehsan Arbabi、Amir Arbabi、Seyedeh Mahsa Kamali、Yu Horie 与 Andrei Faraon，*Optica* 3(6), 628–633，DOI 10.1364/OPTICA.3.000628，2016-06-10 正式出版。2026-11-19 查 Crossref 452 次。沿 Arbabi 2017 补件 Ref. 4 查得。论文用六角阵列中的四柱超分子控制 915 和 1550 nm 的相位，并实测两只同口径、不同 NA 的透射镜。Fig. 2d 图注把第二个相位坐标写为 950 nm，实验两波长由 Fig. 4 和 S2 的原标确认。[正式主文](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628.pdf?download=1) · [Crossref](https://api.crossref.org/works/10.1364/optica.3.000628)

## 有限共轭与实测像面

| 实物 | 近轴焦距 | 有限共轭设计像距 | 915／1550 nm 的实验焦斑 | 915／1550 nm 的作者功率比 |
| --- | ---: | ---: | --- | --- |
| 300 μm，NA 0.46 | 286 μm | 400 μm | x 向 FWHM 约 1.9／2.9 μm。Fig. 4c 刊轴扫图。 | 22%／65% |
| 300 μm，NA 0.29 | 495 μm | 1000 μm | 补件 S2a 印 915 nm 实测峰位 980 μm，焦斑图在该面取得。1550 nm 给轴扫图，FWHM 和数值峰位待补。 | 25%／72% |

S1 从相位抛物线拟合得近轴 286、495 μm 和设计 NA 0.46、0.29。实验光纤端面至超表面约 1100 μm，含 600 μm 空气间距和 500 μm 熔融石英基底。400、1000 μm 是这个有限共轭下的设计像距。低 NA 的 915 nm 峰位对同一设计面为 `980−1000=−20 μm`，由本库计算，独立保留两输入。两色之间的相对峰位尚缺成对数值。[主文 pp630–631 Fig.4](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628.pdf?download=1#page=3) · [补件 S1 与 S2](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628_si.pdf?download=1#page=2)

氢化 α-Si 柱高 718 nm，六角格距 720 nm，正文给最小柱径 72 nm、最小间隙 50 nm。实验用 100×、NA 0.95 收集物镜和 200 mm 管镜，轴向原始步长 4 μm、图示上采样至 2 μm。1550 nm 的转换层相机响应不均，作者对轴向强度图过滤高于自由空间传播常数两倍的空间频率噪声。915 nm 用 CoolSNAP K4 CCD，校准片给像素倍率的方法而具体标定值未公布。NA 0.46 同焦镜在偏振改变时未见可测焦斑或功率差，入射偏振状态与检验阈值未列。[Fig. 3–4](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628.pdf?download=1#page=4) · [补件 S1](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628_si.pdf?download=1#page=2)

## 两种功率测法及模拟参考

915 nm 分子为透过焦面实体 20 μm 镀铬针孔的功率，分母为光纤输出。S1 指出由于基底和针孔玻璃反射，报告值为效率下界。1550 nm 用像平面 2 mm 虹膜限定焦区，约对应物方 20 μm，分母为同光路无虹膜时的光纤端面像功率。两测法各绑定实验谱点和作者印出的百分数。[正式主文 p631](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628.pdf?download=1#page=4) · [补件 Fig. S1](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628_si.pdf?download=1#page=3)

高 NA 的缩比 FDTD 为 75 μm 口径、100 μm 名义像距，作用面前传播和出射传播用平面波展开。Fig. 4a–b 的模型 x 向 FWHM 约 1.9／3 μm，模拟聚焦效率为 32%／73%，分母是入射到模型镜面的功率，分子为焦面直径 20 μm 圆盘积分。低 NA 的对应模型为 SI Fig. S2e–h 的 75 μm 镜，图版未印逐点峰位及效率。理想相位掩模用高 NA 实验照明，报告衍射极限参考 FWHM 1.6／2.75 μm，正文该段未标方向。三组数值随各自模型或实验记录。[主文 Fig. 4 及模拟段](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628.pdf?download=1#page=4) · [补件 S1](https://authors.library.caltech.edu/records/32je3-2pw19/files/optica-3-6-628_si.pdf?download=1#page=2)

## 原始数据入口

校方馆藏正式正文 `optica-3-6-628.pdf` 为 1521044 字节，MD5 `d318348d3c24ffc54c253868e86ff424`。正式补件 `optica-3-6-628_si.pdf` 为 3321335 字节，MD5 `d9ad519e716439f639666a09a4ee4be7`。两份均为 6 页且无 PDF 内嵌附件。DataCite 精确关联查五项，分别为 arXiv、Figshare 补件及其集合的固定和通用标识。已读材料未见独立数据声明或原始二维 PSF、Strehl 及 MTF 表。该项以实测焦位明文、图版、FWHM、效率和测量条件录入。[Caltech 馆藏](https://authors.library.caltech.edu/records/32je3-2pw19) · [DataCite 关联查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1364%2FOPTICA.3.000628%22&page%5Bsize%5D=25) · [期刊 Figshare 补件](https://doi.org/10.6084/m9.figshare.4922441)
