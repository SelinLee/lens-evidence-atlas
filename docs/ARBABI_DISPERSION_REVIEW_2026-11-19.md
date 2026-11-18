# Arbabi 2017 反射式超透镜的色散控制与固定焦面

Ehsan Arbabi、Amir Arbabi、Seyedeh Mahsa Kamali、Yu Horie 和 Andrei Faraon，*Optica* 4(6), 625–632，DOI 10.1364/OPTICA.4.000625，2017-06-07 正式刊出。2026-11-19 查 Crossref 347 次。按经典原始研究纳入。两组实物提供同口径的色散对照和波长扫描，较长焦距的配置另有固定面焦斑、Strehl 和相对功率效率。[正式主文](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica-4-6-625.pdf?download=1) · [Crossref](https://api.crossref.org/works/10.1364/optica.4.000625)

## 240 μm 和 500 μm 两组实物

| 口径、设计焦距 | 实物角色 | 实测及图位 |
| --- | --- | --- |
| 240 μm、650 μm（1520 nm） | 超负色散、常规负色散、低色散、正色散，四只分别记录。 | Fig. 5b 为焦距随波长的曲线。S10a–d 和 S11a–d 给各 15 个波长的轴向强度和 z 向剖面，红虚线为 650 μm，z 轴单位 μm。 |
| 500 μm、850 μm（1520 nm）、名义 NA≈0.28 | 常规负色散、低色散 σ=300 nm、低色散 σ=50 nm，三只分别记录。 | S13a–b 的常规和 σ=300 nm 同时给轴向强度、固定 850 μm 面的横向焦斑和 x 向剖面，S13c 的 σ=50 nm 给后两项。三组都使用对齐的 15 个波长行。S14a 对照 σ=300 nm，S14b 对照 σ=50 nm。 |

七只镜的实际谱点是 1450–1590 nm、每 10 nm。500 μm 主文 Fig. 5f–g 单列 1450、1480、1520、1560、1590 nm 五个示例。主文 p631 称常规镜在固定 850 μm 面仅于 1500–1550 nm 聚焦，给出的依据是焦面强度图，阈值未说明。Fig. 5d 和 S14a–b 的焦距误差以表面外 850 μm 的设计面为零参考，纵轴单位 μm。焦距、焦距误差和宽度没有逐波长原表。横向剖面的横坐标是 x［λ］，二维图色标 0–1 a.u.，标尺 2λ。文中“五倍”和“近三倍”为作者对色散及工作带宽的概括，保留文字语境和判断阈值缺口。[主文 p630–631 Fig. 5](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica-4-6-625.pdf?download=1#page=6) · [补件 pp14–18](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica46625s001.PDF?download=1#page=14)

硅基底上依次为 100 nm Al 反射层、30 nm Al₂O₃ 刻蚀停止层、325 nm SiO₂ 间隔层及 725 nm α-Si 方柱，格距 740 nm。测量采用可调谐激光、分束器和 50×／NA 0.5 收集物镜、200 mm 管镜及 InGaAs 相机。作者沿轴和横向强度用 Fourier 上采样绘制。轴向步长、横向物方像素、入射偏振、场点与傅里叶处理前数组仍缺。S1 的两种 σ 是优化时反转高斯权重的谱宽参数。[主文 p628 Fig. 3](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica-4-6-625.pdf?download=1#page=4) · [补件 S1／S8](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica46625s001.PDF?download=1#page=1)

## 相对聚焦功率与二维 MTF 积分

Fig. 5e 的纵轴是归一化效率。S1 指定分子为物理直径 2 mm 的虹膜内聚焦光功率，对应物方约 40 μm 直径。分母为同一测量链下常规 500 μm 镜在 1520 nm 的虹膜内功率。正文给低色散线整带 50%–60% 的相对区间，常规镜 1520 nm 的约 80%–90% 绝对效率是估计。Fig. 5 的邻近焦位和轴扫针对 σ=300 nm，效率子图自身只写低色散，归属保留为两只低色散镜的待核组。各谱点效率留空。[主文 Fig. 5e、p631](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica-4-6-625.pdf?download=1#page=6) · [补件 S1 测量段](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica46625s001.PDF?download=1#page=1)

S14c–d 的纵轴为无量纲 Strehl，横轴为波长 nm。作者写明对归一化二维 MTF 体积求积分，σ=300、50 nm 分别与常规镜对比。补件公开的是 Strehl 曲线和算法说明。二维 MTF、弧矢/切向频率表、归一化参考、原始 PSF 数组、处理细则和采样尺度均未获。S13 的 850 μm 是横向光强图评价面，S14 图注未复述 MTF 评价面。[补件 Fig. S14](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica46625s001.PDF?download=1#page=18) · [博士论文 Fig. 4.A14](https://thesis.caltech.edu/11481/8/Ehsan_s_Thesis-2019-05-02.pdf#page=143)

## 模型和数据入口

Fig. 2e–i／S3 为四个假想单元模型。Fig. 5a／S9 为四个 240 μm 实物设计的反射单元库模型。Fig. 5c／S12 为 500 μm 常规和 σ=300 nm 的传播模型。S1 区分 8 个设计谱点（20 nm 间隔）与图中 15 个模型谱点（10 nm 间隔），模型轴上强度最大值作为其焦位。与光栅有关的峰位、透过和效率另属衍射偏折功能。[主文 p627 Fig. 2](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica-4-6-625.pdf?download=1#page=3) · [补件 S1、S3、S9、S12](https://authors.library.caltech.edu/records/nnf8v-92988/files/optica46625s001.PDF?download=1)

CaltechAUTHORS 正式 PDF 为 8 页、3298806 字节，MD5 `e95d2d4e99476016ea491c98fe0307cc`。补件 `optica46625s001.PDF` 为 21 页、11059053 字节，MD5 `b4b3d3f5edad07015469fd7f71bb6fc9`。两份文件与馆藏清单吻合，均无内嵌附件。DataCite 的五个关联 DOI 对应 Figshare 补件和集合的固定/通用标识、同一作者的 arXiv 版本。Figshare API 直连返回 403。可读主文未见单独数据可用性声明。逐点评述保留图证和缺口。[Caltech 文件清单](https://authors.library.caltech.edu/records/nnf8v-92988) · [出版社补件 DOI](https://doi.org/10.1364/OPTICA.4.000625.s001) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1364%2FOPTICA.4.000625%22&page%5Bsize%5D=25)
