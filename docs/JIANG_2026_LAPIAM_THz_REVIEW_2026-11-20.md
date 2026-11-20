# Jiang 2026 大口径双偏振太赫兹消色差镜

Xiaoqiang Jiang 等，*Advanced Science* 13(25), e74515，DOI `10.1002/advs.74515`。2026-02-17 正式在线。按 2025 年 3 月中科院综合性期刊大类一区纳入，正式版的轴向峰位和固定光路成像支持光学消色差。2026-03-27 的文章更新补记通讯作者。所有材料共用一个研究编号。[原刊与数据声明](https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.74515) · [2025 年分区表条目](https://www.ifabiao.com/sci/21983844/)

## 单镜、相位设计及轴峰

论文 §§2.1–2.2、Figs. 1、4 和补件 Figs. S2–S5 给出 22.1 mm 高阻硅实物，设计焦距 80 mm。六种旋转对称单元按粒子群优化（PSO）匹配九个频率的双曲相位。频率相关的附加项 \(C(f)\) 对同一频点的全孔径相位做整体平移。制成柱高约 230 μm，设计柱高 240 μm。8.17 cm 实测均值若代入空气圆孔几何式，NA 约 0.134，数量级与作者报告 0.13 一致。表格保留作者报告的 0.13。[正式 PDF pp.2–6](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=5) · [正式 DOCX](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/ADVS-13-e74515-s001.docx)

正入射线偏振，旋转同一枚透镜 90°切换相对于器件的 x/y 偏振。轴位以 x–z 强度最大点定义。各偏振在 0.80–1.20 THz 每隔 0.05 THz 取样，轴峰、FWHM 和效率曲线各九点，轴向及横向热图展示五个频率。正文 §2.2 的探针分辨率是 0.1 mm，§4.3 和补件 Fig. S7 的 20 μm 对应仪器标称最小空间分辨率。实际扫描间距和坐标零位校准待核。x 通道的 1.10 与 1.20 THz 图还见主焦前弱焦点，原文未给弱焦和主焦的独立数值。[Fig. 5](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=7) · [Fig. 6](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=8)

| 入射偏振 | 实测平均焦距 | 实测 ACV | 实测平均聚焦效率 | 位置 |
| --- | ---: | ---: | ---: | --- |
| x | 81.7 mm | 2.86% | 46.97% | pp.5–7 §2.2、Fig. 5c,h 与正文 |
| y | 81.7 mm | 2.84% | 46.14% | pp.8–9 §2.2、Fig. 6c,h 与正文 |

ACV（achromatic coefficient value）按 Eq. (4) 为九个频点焦距的总体标准差除以同组均值，乘 100%。两组分母均为 81.7 mm。作者称均值相对 80 mm 设计的偏差为 2.13%，与 ACV 各有统计定义。聚焦效率的积分圆直径为该频点的 3×FWHM，功率分母是入射到镜面上的总功率。实测均值按所测九频点保存。Figs. 5c,g,h 与 6c,g,h 无逐点数字标签。Fig. 6f 图内横坐标 `x/mm`，对应正文亦称 x，图注写 y。y 偏振的实验截线方向先留为未消歧。[Eq. (4) 与效率定义](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=6) · [y 偏振结果正文](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=9)

## 模拟与固定光路成像

- 补件 Fig. S8a 正文按频率升序印出 x 偏振九点模拟 FWHM，依次为 1.13、1.07、1.04、1.00、0.96、0.93、0.90、0.86、0.81 mm。补件 Figs. S8、S9 图轴倒数第二刻度重复印 `1.05`，按主文规定 0.05 THz 间隔与补件正文九项顺序将第八项定位到 1.15 THz。y 偏振模拟宽度只有图。模型效率仅录补件明报的 0.80 与 1.00 THz 两组最小/最大值。模拟焦距均值为 78.9 mm，模拟 ACV 为 2.32%／2.24%，平均效率为 53.97%／52.88%。[补件 Figs. S8–S9 与正文](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/ADVS-13-e74515-s001.docx)
- 等倍成像按正文使用 16.34 cm 的物距和像距。3 mm 间隙 U 形靶在宽带图与 0.8、0.9、1.0、1.1、1.2 THz 的固定光路图均可辨。1.8 mm 靶在宽带及前三个频点可辨，后两点的结论是未能辨认。间隙为靶件几何尺寸，未计入成像截线宽度或 MTF 轴。[主文 Fig. 7](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=10) · [补件 Fig. S10](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/ADVS-13-e74515-s001.docx)

## 原始数组与可用版本

在本机独立无头 Chrome 取得 PMC 正式版 4436211 字节，SHA-256 为 `3ec0b8d750bc84d0933983806048f8953d253ff71f4c278aba59499941ff04ba`。正式补件 2106753 字节，SHA-256 为 `75e638d39aaf6712718cd2b23c4d767bf24e0ccd919243907ddf86fef1eb7fd2`。主文 Fig. 5、6 图版是 JPEG。补件中的一个嵌入对象为 Eq. S1 的 MathType 公式，未发现工作表，Figs. S8、S9、S10 分别是 `word/media/image9.jpeg`、`image10.jpeg`、`image11.jpeg`。DataCite 和 Zenodo 精确 DOI 查询均为 0。期刊 §Data Availability Statement 指向通讯作者合理请求。逐频点实测峰位、峰峰焦差、焦斑及效率原始数值、Strehl 与 MTF 留空。[主文数据声明](https://pmc-oa-opendata.s3.amazonaws.com/PMC13137821.1/PMC13137821.1.pdf#page=11) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1002%2Fadvs.74515%22) · [Zenodo](https://zenodo.org/api/records?q=%2210.1002%2Fadvs.74515%22)
