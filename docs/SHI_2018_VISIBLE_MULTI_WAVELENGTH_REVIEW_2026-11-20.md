# Shi 2018 四波长反射式消色差超透镜

Zhujun Shi 等，*Nano Letters* 18(4), 2420–2427，DOI `10.1021/acs.nanolett.7b05458`。2018-02-20 正式在线，2026-11-20 查 Crossref 224 次、OpenAlex 239 次。依据作者实物在四个可见波长的轴扫与 Strehl 并有焦区功率测量，纳入经典研究。同文两个波长控制波束发生器（WCBG）独立配置，三件共用文献编号。[期刊](https://pubs.acs.org/doi/10.1021/acs.nanolett.7b05458) · [Crossref](https://api.crossref.org/works/10.1021/acs.nanolett.7b05458) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1021/acs.nanolett.7b05458)

## 四波长器件和轴向焦差

主文印刷 p.2424（PDF p.5）Results 和 Eq. (3) 给 MAM 口径 400 μm、设计 NA 0.2。TiO₂ 方柱 600 nm、SiO₂ 间隔层 180 nm、Ag 反射层 1100 nm，单元周期 450 nm，见 Fig. 1d 与 p.2423 工艺段。反射构型扩大传播相位，导模共振增大各波长可用的相位覆盖；作者以离散波长的目标双曲相位作拟合。MAM 的数值设计焦距在已核主文中未印，p.2424 的 0.98 mm 出现在 WCBG 的 Eq. (4) 设计段。

| 实测波长（nm） | 460 | 540 | 567 | 700 |
| --- | ---: | ---: | ---: | ---: |
| 作者实测焦距（μm） | 979 | 985 | 976 | 982 |
| 作者 Strehl | 0.86 | 0.91 | 0.81 | 0.92 |
| 作者聚焦效率（%） | 17.7 | 16.0 | 21.4 | 22.6 |

焦距来自 Fig. 4a–d 图注与 Results 的四个 mm 数值，逐项折为 μm。四点跨度为 985−976=9 μm，由本库计算，端点分别为 540 nm 和 567 nm。p.2423 给出 180–1780 μm 宽域的 10 μm 步长和 901–1057 μm 近焦区的 3 μm 步长。0.1 μm 另为移动台最小步进规格。主文未给轴向零位标定、峰位拟合算法或误差模型。Fig. 4i 还展示弱高阶焦点，未定位逐点数值。

Fig. 4e–h 的蓝色为 x、红色为 y，纵向为相对光强。实测截线与峰值为 1 的理想衍射截线按等聚焦功率归一。Strehl 使用作者 Results 的数值，归一化积分窗、x/y 汇聚方法和原始像素待核。FWHM 留空，横向物方采样与 MTF 待查。[原文 Fig. 4](https://www.ece.nus.edu.sg/stfpage/eleqc/NL18_Shi.pdf#page=5)

## 功率分母和同面涡旋测试

p.2423 的方法段给 MAM 效率分子为像面直径 0.25 mm 虹膜后的功率，用该孔抑制零级并通过 Airy 第一环。分母用同口径 400 μm 银镜反射，开放虹膜，以 200 μm 小银镜分别通过前后级的功率比校正第二级通光。p.2426 另说明全 MAM 反射功率低于同口径银镜的 30%，焦区相对 MAM 自身总反射功率高于 70%，保留出处，未对四波长分别赋值。

Figs. 5–6 的 WCBG1 和 WCBG2 是两只口径 400 μm、设计 NA 0.2、设计焦距 980 μm 的器件。图内焦斑均采于 z=980 μm 共评价面。

| 配置 | 实测波长（nm） | 对应拓扑荷 | 作者所报效率（%） |
| --- | --- | --- | --- |
| WCBG1 | 455／540／700 | 2／1／0 | 31／37／33 |
| WCBG2 | 480／515／690 | 1／0／0 | 31／32／33 |

WCBG1 的作者报告三点平均约 34%。六个效率逐项保留原印字，单独 WCBG 的焦区积分范围、计量光路和功率分母缺失，统一聚焦效率散点留空。横纵焦斑曲线有公布，逐波长轴向最佳焦位、FWHM 和 Strehl 留空。p.2425 提到补件 Fig. S8a–c 中的高 NA 0.8 设计为模拟。全彩全息的 Fig. 7 也是模拟。[光功率方法](https://www.ece.nus.edu.sg/stfpage/eleqc/NL18_Shi.pdf#page=4) · [WCBG Figs. 5–6](https://www.ece.nus.edu.sg/stfpage/eleqc/NL18_Shi.pdf#page=6)

## 原始数据入口

本机独立无头 Chrome 取得 NUS 的八页 ACS 正式版 PDF，2498730 字节，SHA-256 `1213cbd1112936ca696b0cc262b37b05c13e8a0d3771925783a1ef2ab524120d`，未见嵌入文件。视觉核对 Figs. 4–6。Harvard 作者组 PDF 在网页索引可读，Chrome 直连 403。ACS 自身列补件 `nl7b05458_si_001.pdf`，目录明列实测焦距。Crossref 登记补件 DOI `10.1021/acs.nanolett.7b05458.s001`，ACS 补件、DOI 跳转及 Figshare 的补件入口在独立无头 Chrome 返回 403。DataCite 精确关系搜索结果为 0。补件可能有额外测量，仍需取得内容后核定。未定位原始轴扫栈、PSF 像素标尺或 MTF 数表。

[Harvard 作者组](https://capasso.seas.harvard.edu/publications/single-layer-metasurface-controllable-multiwavelength-functions) · [补件登记](https://api.crossref.org/works/10.1021/acs.nanolett.7b05458.s001) · [补件入口](https://doi.org/10.1021/acs.nanolett.7b05458.s001) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1021%2Facs.nanolett.7b05458%22)
