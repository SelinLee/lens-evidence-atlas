# Wang 2021 红光至近红外宽带消色差超透镜

Yujie Wang、Qinmiao Chen、Wenhong Yang 等于 2021-09-21 在 *Nature Communications* 12, 5560 发表原始研究，DOI 10.1038/s41467-021-25797-9。2026-11-18 查 Crossref 的引用计数为 344，按经典研究纳入。两只实制 TiO₂ 镜的实验覆盖红光到近红外，并报告使用同一功率定义的聚焦效率。器件矩阵沿用现有显微应用记录的 DOI 和引文编号。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [Crossref](https://api.crossref.org/works/10.1038/s41467-021-25797-9)

## 几何、轴向测量和成像

- **30 μm、NA 0.24 实物**。主文 p3 Fig. 2 图注、p4 Fig. 3 和同行评审 PDF p23 锁定实物尺寸及样品归属。TiO₂ 柱高 1500 nm，ITO 镀层 13 nm。Fig. 3e–f 的五列是 650、700、800、900、1000 nm。作者在 Fig. 3e 绘 z=60 μm 参考线，正文称实验焦点约在 60 μm，评审答复用 60 μm 做标靶光路计算。实测谱点焦位和峰峰残差留空。原图轴向跨度 0–100 μm，强度色标 0–1 a.u.。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [公开同行评审 PDF](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM2_ESM.pdf)
- 主文 p3 的拟合段给出五组焦斑的共同限定，Strehl 大于 0.81，FWHM 相对理论值偏离小于 9%。Fig. 3f 是二维光斑及沿直径剖面，逐谱点 Strehl、绝对宽度和归一参考未列。方法与补充 Fig. S6 描述窄带滤光、横向相机帧堆叠和准直光路。轴向步长、物方像素和横向取面规则仍待核。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [补充 DOCX](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM1_ESM.docx)
- **25 μm、NA 0.10 实物**。主文 Fig. 2 图注和补充 Note 3／Figs. S3–S4 确认几何和制样。主文 Fig. 4a 插图给出同五波长的焦斑照片。数值型设计焦距、逐点焦位和 FWHM 待补。Fig. 2c 对这只样品给出了模型焦距曲线。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [补充 DOCX](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM1_ESM.docx)
- **USAF 继像系统**。主文 pp3–5 说 NA 0.24 镜在 650 nm 可辨 1951 USAF 第 8 组第 4 元素，作者给约 1.38 μm。由靶标公称空间频率 \(2^{8+3/6}\) lp/mm 换算，单条线宽约 1.381 μm。Fig. 3g 展示的是较粗的第 7 组第 6 元素在五波长下的实拍。评审答复 p24 Comment 11 说明正式 Fig. 3g 换用消色差双合筒镜重拍。旧配置的筒镜计算焦移 1.38 mm 有独立归属。记录为标靶线宽，原始像和判读阈值待补。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [公开同行评审 PDF](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM2_ESM.pdf)

## 效率、模型与数据入口

Fig. 4a 是无偏振实验。主文 p6 Methods 与补充 Note 5 指明分子为半径 3×FWHM 的焦圈功率，分母为原镜片轮廓内的入射功率。作者横移镜片 1 mm 取得分母，扣除背景并限制 CCD 饱和。两镜均有五个图示谱点，作者未明确平均权重及误差。

| 实物 | 主文 p5 带内报告 | 正文和图可对齐的单波长效率 |
| --- | --- | --- |
| 30 μm / NA 0.24 | 约 77.1%，SI Note 1 约 77% | 650 nm 约 65%，800 nm 约 85% |
| 25 μm / NA 0.10 | 88.5%，SI Note 1 另报 88.1% | 650 nm 85% |

低 NA 的 700 nm 在正文被称为 90.2% 的最高点，Fig. 4a 与 Fig. S8 无偏振线的最高点均在其他波长。保留作者的 90.2% 原述与图位，700 nm 的量化散点留空。两处带均值均保留出处，低 NA 散点采用主文 88.5%，标注补件差异。Fig. 4b 的 800 nm 偏振角曲线与补充 Fig. S8 的 X/Y 对照仅留原图和条件。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [补充 DOCX](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM1_ESM.docx)

Fig. 2c–d 是独立 FDTD 模型。NA 0.24 的带均值为 83%，作者给 650 nm 72% 及 850 nm 93%。其焦位变化小于 7% 是作者的模型原述，分母与计算口径未说明。NA 0.10 的 93% 属于模型。另有 Fig. S12 的可见光设计，口径 25 μm、NA 0.20、设计焦距 60 μm、柱高 1200 nm，图示 450–700 nm 六点，模拟平均效率 88.3%。图版上部绘效率，下部绘相对焦距变化百分数。模型效率未明示焦圈和分母。[主文 PDF](https://www.nature.com/articles/s41467-021-25797-9.pdf) · [补充 DOCX](https://static-content.springer.com/esm/art%3A10.1038%2Fs41467-021-25797-9/MediaObjects/41467_2021_25797_MOESM1_ESM.docx)

正式 PDF、补充 DOCX、同行评审 PDF 已可读取。DOCX 中 12 张 PNG 包括 `word/media/image8.png`（Fig. S8）和 `word/media/image12.png`（Fig. S12），未列数值工作簿。PMC 文件清单仅见主文、发布图版和两份补件，作者实验室成果页仅附文章 PDF，DataCite 关联 DOI 总数为 0。p6 数据声明所列作者网盘在本机独立无头 Chrome 显示「邀请链接已失效」。逐谱点焦位、焦斑数组及像素/轴向标定、效率原表、MTF 及横向色差仍待补。[作者网盘](https://pan.baidu.com/s/4lag6i6F) · [PMC 文件清单](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC8455568.1%2F) · [实验室成果页](https://micro-nanophotonics.hitsz.edu.cn/info/1040/1417.htm) · [DataCite 查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-021-25797-9%22&page%5Bsize%5D=25)
