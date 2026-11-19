# Baek 2022 可见光三色空间交错实物

Baek 等，*Photonics Research* 10(12), B30–B39，2022-11-30 正式上线，DOI 10.1364/prj.470004。由 Hasegawa 2026 Table 1 和参考文献 47 找到，同 DOI 尚未收录。2026-11-19 查 Crossref 64 次、OpenAlex 69 次，按经典文献纳入。[期刊 DOI](https://doi.org/10.1364/prj.470004) · [期刊目录](https://opg.optica.org/prj/issue.cfm?issue=12&volume=10) · [Crossref](https://api.crossref.org/works/10.1364/prj.470004) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1364/prj.470004)

通过独立无头 Chrome 取到 Chinese Laser Press 的十页正式 PDF，2233039 字节，SHA-256 为 `934832b6aef9b7cf846c1445e53887a2237e851d56ccebaae2da00179ae23cc7`。核读 B30–B37、附录 A–F 和数据声明，视觉对照 Figs. 2–6、9、Table 1。下文采用原刊印刷页码。[正式 PDF](https://www.researching.cn/ArticlePdf/m00072/2022/10/12/B30.pdf)

## 光学校正与实测

- B32 Fig. 2a 和 Appendix B。三套面向 450／532／700 nm 的纳米柱子阵列交错在同一块 a-Si:H／玻璃器件上。薄膜厚 600 nm，蓝色子阵列周期 230 nm，绿／红色为 460 nm，分别控制三个离散波长的光学相位。
- B32–B33 Figs. 3a–d。实物直径 450 μm、名义 NA 0.87、设计焦距 125 μm。作者由每个 z 位置的横向强度图重组轴向剖面，三色均在共同标称面附近聚焦。Appendix C 给出 0.5 μm 的轴扫步长、50× 物镜和 CCD，未给逐色实测峰位及残余色差的不确定度。步长只说明取样间隔。450–700 nm 中间波长和横向色差缺实测证据。
- B34 Figs. 5–6。普通 CCD 标靶只展示了 532 nm 原始图，另一个屏幕拍摄装置展示同一标靶数字的三个通道并有斜拍畸变。入选的直接光学证据来自 Fig. 3d 轴扫。

| 波长 | 实测横向 FWHM | Airy 参考 FWHM | 实测剖面算得的 Strehl | 实测聚焦效率 |
| --- | --- | --- | --- | --- |
| 450 nm | 298.5 nm | 264.6 nm | 0.89 | 5.9% |
| 532 nm | 323.4 nm | 312.8 nm | 0.88 | 11.3% |
| 700 nm | 457.1 nm | 411.6 nm | 0.82 | 13.6% |

FWHM 取 B33 正文与 Fig. 4d–f。B37 Table 1 的 0.265／0.313／0.412 μm 对应理论参考宽度的舍入。正文给 `0.514 λ / NA`，将印刷的 NA 0.87 代入得到约 265.9／314.3／413.6 nm，作者计算使用的未舍入 NA 未给。数据库保存原文报告的理论数值。Strehl 按 B34 等积分归一的实测与理想 Airy 剖面中心强度计算。剖面截线方位、积分窗及原始采样未知。效率取 B32 和 Appendix C 规定的焦面半径 4×FWHM 圆内功率对总入射功率之比。三波长间的效率差异也受材料吸收、子阵列相位及工艺影响，论文未定量分离各因素。[Fig. 4 与效率方法](https://www.researching.cn/ArticlePdf/m00072/2022/10/12/B30.pdf#page=4)

Appendix D Fig. 9 的另一次蓝光扫描包含五个线偏振角和一个圆偏振状态。作者给跨偏振均值约 5.94% 与 SD 约 0.07 个百分点。六种状态列出，样本重复数和原始柱值未知。该装置未重述焦区积分及分母。[偏振测量](https://www.researching.cn/ArticlePdf/m00072/2022/10/12/B30.pdf#page=7)

## MTF 原始数据

Fig. 4g／h／i 为对应三个谱点的曲线，横轴 0–10 cycles/μm，纵轴无量纲 0–1。B34 Eq. (3) 用实测焦斑强度的二维傅里叶积分除以总强度积分，零频归一为 1。方向提取、傅里叶窗、横向有效 μm/px、场角标定与逐点数表均未核到。轴向 0.5 μm 步长不能用于横向频率校准。

B37 Data Availability 说明原始数据当时未公开，合理请求可向作者获取。Optica 期刊目录、正式主文与课题组论文列表可定位文献，未附有可核实的原始数据。DataCite 以 DOI 查关联标识返回零项，POSTECH OASIS 落地页在本机无头 Chrome 超时。数据库保留曲线位置与坐标，不填 MTF 截止频率或逐频值。[原始数据声明](https://www.researching.cn/ArticlePdf/m00072/2022/10/12/B30.pdf#page=8) · [DataCite 关联检索](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1364%2Fprj.470004%22) · [POSTECH OASIS](https://oasis.postech.ac.kr/handle/2014.oak/116081) · [作者实验室目录](https://photonics.postech.ac.kr/publications)

## 同文 20 μm 作者模拟

B32 Fig. 2b–e、B35 §3 和 Appendix A 给 D 20 μm、设计 f_d 5.5 μm、NA 0.87、FDTD 网格 20 nm，三个模拟效率为 25.2%／58.7%／66.4%。效率分母为到达透镜的总入射功率，模拟积分半径未知。B32 正文将横向分布写作 f = 5 μm，Fig. 2b 的横向坐标原点与 5.5 μm 设计焦距未能对读，逐色数值峰位留空。[模型主文](https://www.researching.cn/ArticlePdf/m00072/2022/10/12/B30.pdf#page=3)
