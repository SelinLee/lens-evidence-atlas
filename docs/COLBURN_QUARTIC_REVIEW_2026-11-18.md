# Colburn 与 Majumdar 可见光四次相位双片变焦

Shane Colburn、Arka Majumdar，*ACS Photonics* 7(1), 120–127，DOI 10.1021/acsphotonics.9b01216，2019-12-11 在线、2020 年卷期。2026-11-18 查 Crossref 56 次，按经典研究纳入。其同一对双片在变焦过程中保留轴向色移，但扩展焦深可使固定像面的三色 PSF 大致相似。本文可用来追溯光学编码、残余色移和反卷积成像之间的关系。[主文排版 PDF](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf) · [Crossref](https://api.crossref.org/works/10.1021/acsphotonics.9b01216)

## 实物、焦位和三色 PSF

- 双片为石英基底上的 Si₃N₄ 圆柱，厚 600 nm、晶格周期 350 nm。两片各自的名义孔径为 1 mm，博士论文 Fig. 5.16 两幅布局的 x、y 均为 ±0.5 mm。设置改变时有效重叠光瞳、各方向有效 NA 都未量化。Fig. 5.11 的 0.42 属于测量用显微物镜。[主文 PDF pp B–C、F](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=2) · [博士论文 PDF pp 96–97、103、109](https://labs.ece.uw.edu/amlab/Thesis/Thesis_Shane_Colburn.pdf#page=109)
- Fig. 3 给 530 nm 的五次轴扫，横移参数 d 为 25、50、75、100、125 μm。双片分别以正负 d 代入 Eq. 2／5，d 保留作者定义。名义焦距对应 6、3、2、1.5、1.2 mm。其中 d=75 μm 的 2 mm 按 Eq. 3 的反比与 d=50 μm 对应 3 mm 计算，标本库计算。插图黑点为实测 z 峰位，数值留空。作者在 530 nm 下的调焦总跨度为 4.8 mm。[主文 PDF pp B–E](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=4)
- Fig. 4A／B 的波长标注为 455、530、625 nm，横轴为 z (mm)，纵轴为 y (μm)，色条为归一强度 0–1。d=100 μm 的共用参考面 z=1.5 mm，d=50 μm 的参考面 z=3 mm。论文报告轴向色移明显。两个设定里的逐点峰位、峰峰焦移、精确轴向焦深和横向色差均缺原值。[主文 PDF p E Fig. 4](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=5)
- Fig. 5 上列色序为红、绿、蓝。1.5 mm 单片 A–C、双片 D–F，3 mm 单片 G–I、双片 J–L。p D 实验正文在后一组误写 H–J 与 K–M，按图版、图注和同一研究的博士论文页面核对归属。图中横向比例尺为 78.3 μm。远场针孔、20× NA 0.42 继像测得固定面 PSF，LED 宽度蓝 25 nm、绿 30 nm、红 15 nm。轴向步长、原始采样矩阵、像素标定、焦斑 FWHM 与 Strehl 待补。[主文 PDF p E Fig. 5](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=5) · [博士论文 PDF pp 100–103](https://labs.ece.uw.edu/amlab/Thesis/Thesis_Shane_Colburn.pdf#page=101)

## MTF、衍射效率与重建

| 横移 | 固定评价面 | 正文的跨波长平均 MTF10 | 曲线图 |
| --- | --- | --- | --- |
| 100 μm | 1.5 mm | 约 9.6 cycles/mm | 主文引用 Fig. S3，博士论文 Fig. 5.9A |
| 50 μm | 3 mm | 约 11 cycles/mm | 主文引用 Fig. S3，博士论文 Fig. 5.9B |

博士论文 Fig. 5.9 横轴 0–200 lp/mm，纵轴 −50 至 0 dB。双片用实线、单片对照用虚线、黑线为 530 nm 理想衍射极限。正文的两个数字是作者估计的三色平均 MTF 降至 0.10 的频率。方向、物像频率参考面、归一化、dB 换算和三色加权未给，无法从公开图单独核算这两个点。作者未公开逐频表或 PSF 数组，本库未估读曲线。[主文 PDF p D](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=4) · [博士论文 PDF p 101 Fig. 5.9](https://labs.ece.uw.edu/amlab/Thesis/Thesis_Shane_Colburn.pdf#page=101)

主文 p D 报三波长、五设定的衍射效率均值 **37%**。博士论文 §5.5.3 明确用焦面内一块与孔径同面积区域和第二超表面所在平面的同面积区域，分别积分强度后取比。Fig. 5.10 的横轴为名义焦距 (mm)，纵轴为衍射效率（0–0.7），无逐点原值。归一化参考面与普通入射功率焦圈效率不同，使用独立字段。[博士论文 PDF pp 97、102](https://labs.ece.uw.edu/amlab/Thesis/Thesis_Shane_Colburn.pdf#page=102)

Fig. 6 在五档均给白光原拍与 TV 反卷积，同一档只用一份 PSF。作者说明重建存在噪声放大，未报告数值 SNR。约 440–640 nm 的相关窗口和约 36° 视场来自模型 §5.9，判据为相关系数大于 0.5，不能用作实测的连续光谱带宽或视场。[主文 PDF pp D、F](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Achromatic_Varifocal.pdf#page=6) · [博士论文 PDF pp 105–107](https://labs.ece.uw.edu/amlab/Thesis/Thesis_Shane_Colburn.pdf#page=105)

作者组的 ACS 排版 PDF（6114893 字节）及博士论文（4274646 字节）已完整取得，均无 PDF 内嵌附件。博士论文 Ch. 5 标明复载这篇研究，补充了实验链和图版。期刊 SI 的直接请求与 Figshare 公开检索返回 403。DataCite 的精确 DOI 关联仅检得 arXiv v2。两处 MTF10 的散点来自正文，所有逐频曲线、轴扫峰位与效率谱点均保留图位并留空数值。[ACS 论文入口](https://pubs.acs.org/doi/10.1021/acsphotonics.9b01216) · [arXiv v2](https://arxiv.org/pdf/1904.09622) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1021%2Facsphotonics.9b01216%22&page%5Bsize%5D=25)
