# Zhang 2022 长波红外消色差偏振子镜

Yaxin Zhang 等，*Opto-Electronic Advances* 5(11), 220058，DOI `10.29026/oea.2022.220058`。正式主文 p.1 记 2022-09-30 在线发表。2026-11-22 精确查询 Crossref 被引 231 次、OpenAlex 235 次。沿 Hu 2024 可见光全斯托克斯偏振超透镜的同题研究和引文定位，通过经典研究例外纳入。作者在同一超表面阵列制备多个偏振子镜，主文 Fig. 5 及补件 Fig. S4 有四谱点光学轴扫和目标焦区比较。[期刊全文](https://www.oejournal.org/oea/article/doi/10.29026/oea.2022.220058) · [Crossref](https://api.crossref.org/works/10.29026/oea.2022.220058) · [OpenAlex](https://api.openalex.org/works/W4312256968)

## 元件与校正证据

主文 p.5 的单子镜设计直径为 **1.7243 mm**，目标焦距 **10 mm**。p.3 Fig. 2a 相邻正文给结构周期 4.3 μm，p.7 制程段给双面抛光硅片上 10 μm 高硅纳米柱。原文未列数值 NA。按圆瞳半径与名义焦距估算的空气几何 NA 约 0.086，仅用作量纲核对。Fig. 5、Fig. S4 并列两个子镜，图上的横向跨度包含两枚器件。

Eqs. (4)、(6) 针对共同目标焦距匹配波长相关聚焦相位，并为正交输入设置发散相位。线偏振通道使用传播相位，圆偏振通道结合几何与传播相位。工作设计区间 9–12 μm，单色焦场实际在 9.3、9.6、10.3、10.6 μm 测量。[主文 pp.3–5 和 Figs. 2–3](https://www.oejournal.org/fileOEJ/journal/article/gdjz/2022/11/oea-2022-0058-Luoxiangang.pdf#page=3)

| 波长（μm） | X 入射／X 子镜聚焦效率 | L 入射／L 子镜聚焦效率 | 轴向焦距和 FWHM |
| --- | ---: | --- | --- |
| 9.3 | 31.8% | Fig. S4e 实测点 | Fig. 5c,d 与 S4c,d 实测点 |
| 9.6 | 33.5% | Fig. S4e 实测点 | Fig. 5c,d 与 S4c,d 实测点 |
| 10.3 | 46.2% | Fig. S4e 实测点 | Fig. 5c,d 与 S4c,d 实测点 |
| 10.6 | 46.3% | Fig. S4e 实测点 | Fig. 5c,d 与 S4c,d 实测点 |

主文 p.8 的效率定义为焦区三倍 FWHM 范围内的能量除以入射光能量。积分范围采用直径或半径、窗口形状、入射功率计量面积和不确定度未明。圆偏振效率只见红色实验点。Fig. 5c 与 Fig. S4c 用 mm 表示作者从轴扫提取的焦位。Fig. 5d 与 Fig. S4d 的宽度轴为 μm，剖线方向未报。a 面板 z 以 `10^4 μm` 为单位，白虚线对应 1 cm 名义焦平面。b 面板为归一化强度，x 为 mm，y 为 μm。残余互差、逐色焦距和焦斑宽度保留图位、数值空缺。

补件 p.S6 §2 说明 CO₂ 激光、线偏振片、四分之一波片、Plug-612 红外相机及电控台沿轴扫描。文中光路指向 Fig. 5c，而原刊的光路图实际为 Fig. 4c。轴向步进、原点绝对标定、相机横向像元尺度和 b 面板针对各谱点的精确取面仍缺。作者在同篇另外验证 X／Y、L／R 正交抑制，保留对应对照，不把入射偏振转交给另一透镜的效率记录。[主文 Fig. 5](https://www.oejournal.org/fileOEJ/journal/article/gdjz/2022/11/oea-2022-0058-Luoxiangang.pdf#page=9) · [补件 pp.S5–S6](https://www.oejournal.org/fileOEJ/article_attachments/oea/202293017917270.pdf#page=5)

图 6 中完整阵列在同一 1 cm 平面进行四谱点、八种入射偏振的表征。其 Stokes 误差及补件 Tables S1–S4 的向量另有用途。图 7 用热陶瓷源、两片滤光片的 9–12 μm 照明拍偏振掩模和 USAF 标靶，作为独立系统配置。四波长激光轴扫、共同面捕获和宽带成像的条件分别保存。[主文 Figs. 6–7](https://www.oejournal.org/fileOEJ/journal/article/gdjz/2022/11/oea-2022-0058-Luoxiangang.pdf#page=10)

## 原始数据入口

用本机独立无头 Google Chrome 取到新版官网的 13 页正式主文及 7 页补件。主文 3258811 字节，SHA-256 `39ec74fe967d0020580d45de4cc7cfe743bc73d8df56ccac067e8e890c636813`，与公开的出版 PDF 副本一致。补件 2192107 字节，SHA-256 `d2d9de5571fb544169eaa96d43582cc7ae5c63cf03e9d1597e90b41902a8dc99`。视觉核 Fig. 5 与 S4 的实验／模拟标记和坐标轴。两份 PDF 的内嵌附件均为零。正式页面的补件清单列 PDF 和图形摘要，未列原始逐色焦位、强度阵列或 MTF 数表。主文 p.13 指向同 DOI 下的补件，未见单独的数据获取段。DataCite 关联 DOI、Zenodo 精确 DOI 与 GitHub 公开仓库题号加 polarimetry 搜索均无匹配。[DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.29026%2Foea.2022.220058%22) · [Zenodo](https://zenodo.org/api/records?q=%2210.29026%2Foea.2022.220058%22&size=8)
