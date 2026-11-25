# Li 2021 毫米级 RGB 超透镜：同一原作者专利的聚焦与方向 MTF 补证

*Meta-optics achieves RGB-achromatic focusing for virtual reality*, Science Advances 7, eabe4458（2021-01-27），DOI `10.1126/sciadv.abe4458`。2026-11-25 本地独立无头 Chrome 查询 Crossref 324 次、OpenAlex 364 次，符合经典原始研究门槛。该文明确实制 2 mm、NA 0.7 与 NA 0.3 的离散谱点消色差镜。既有高 NA 最大三色焦差约 1 μm；本批重点补低 NA 原始证据，不重复录高 NA 图。[原刊正式 PDF](https://pmc-oa-opendata.s3.amazonaws.com/PMC7840120.1/PMC7840120.1.pdf) · [Crossref](https://api.crossref.org/works/10.1126/sciadv.abe4458) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1126/sciadv.abe4458)

## 同一研究与证据边界

原刊 p8 Competing interests 明确列 Harvard 的临时申请 62/981,478、2020-02-25。原作者 Zhaoyi Li、Yao-Wei Huang、Federico Capasso 的 `US20210263190A1`（2021-08-26）封面 (60) 同号同日，正式申请号 17/184,326；同族授权 US11774635B2 为 2023-10-03。A1 p10 Fig. 7A–C 的 x 向 FWHM 351/391/485 nm 与 Strehl 1.0/0.98/0.97 同原刊 p3 Fig. 2F–H 六个印字完全相同，段 [0055] 也同报 488/532/658 nm。p34 段 [0056]–[0058] 与 Figs. 9–10 明确低 NA 0.3、2 mm 器件及实验。按同一研究添加作者披露材料；不把专利当成期刊正式补件、额外论文或独立重复实验。原刊 §Results 的 SI S3 仍未获得。[A1 公开文本](https://patents.google.com/patent/US20210263190A1/en) · [A1 正式 PDF 封面](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=1) · [B2 授权文本](https://patents.google.com/patent/US11774635B2/en)

## 低 NA 三谱点共同焦面实验

| 原作者标注 | 原图 x 向 FWHM (nm) | 位置 | 入库 |
| --- | ---: | --- | --- |
| 图中 470 nm；[0058] 后一个宽度句写 480 nm | 680 | A1 p13 Fig.9 上 / p14 Fig.10A / p15 Fig.10D | 保留印字与两波长，不给确定的波长/宽度配对数值点 |
| 548 nm | 787 | A1 p13 Fig.9 中 / p14 Fig.10B / p15 Fig.10E | 0.787 μm |
| 648 nm | 940 | A1 p13 Fig.9 下 / p14 Fig.10C / p15 Fig.10F | 0.940 μm |

A1 p34 [0057] 与 [0058] 前段明确 470/548/648 nm；[0058] 后一个逐波长宽度句明印 480/548/648 nm，同族 B2 对应段保留冲突。Fig. 10A 的标题明印 470 nm，原刊 Fig. 3I–K 的标靶谱点为 470/548/**647** nm，另一个实验、不能替代本聚焦谱点。全部宽度是 Fig. 10D–F 直接印字，非曲线估读。横轴 X（μm），纵轴归一化强度；Fig. 10A–C 是共同焦面横截面 x/y 和色标 0–1。Fig. 9 XZ 图横轴 Z(μm) 有 −80/−40/0/40/80 刻度，纵轴 X(μm)。段 [0057] 作者形容三色焦移可忽略，未给实际绝对峰位、残余焦差量值、参考零点或误差，不能填0或将高NA的1 μm套给低NA。段 [0058] 给超连续谱线宽 >5 nm，焦点尾部与理想曲线偏离；这不是焦差量值。p33 [0054] 给通用聚焦装置：准直 LCP、100×/NA 0.9 Olympus 接收物镜、180 mm 筒镜、RCP 选择、DCC1545M CMOS。实际样面像素尺度、采样步距及归一化分母未给。实测效率、MTF 数表与设计焦距留空。[A1 Fig. 9](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=13) · [Figs. 10A–C](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=14) · [Figs. 10D–F](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=15) · [段 [0056]–[0058]](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=34)

## 532 nm 方向 MTF

A1 p36 [0068] 与 p22 Fig. 17A–C 明报 NA 0.3、532 nm、1 nm 线宽激光二极管测试。作者报道计算 Strehl 0.95；A、B 是焦区二维归一化强度图及中心 x 向截线。C 为实测切向和弧矢 MTF（实线、虚线），横轴 Frequency (lp/mm)，显示 0–700；纵轴 MTF (%)，0–100；另有 NA 0.3 理论曲线。正文没有说明 MTF 是否由该二维 PSF 计算，缺像/物方标尺归属、场点及方向映射、计算/归一化、原始数组、采样、精确峰位和具体口径。532 nm 不等于上述 RGB 绿光设计谱点 548 nm。该测试记录与低 NA 器件在同篇下分开归为样片身份待核的测量配置，不断言另一只实物，不复制 2 mm 口径。保留作者曲线链接和 Strehl；不取曲线估读点、不自行复算、不填 MTF50 或截止。[Fig. 17](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=22) · [段 [0068]](https://patentimages.storage.googleapis.com/64/89/42/60a2f3f1573b28/US20210263190A1.pdf#page=36)

## 公开文件核查

2026-11-25 独立无头 Chrome 实取正式论文 PMC7840120.1.pdf（8页/1689230 bytes）及 A1 正式 41 页/4305510 bytes，A1 SHA-256 `244b242bfa0676cf52b86d22210bc74fd930945c69188a92c91526688e03874d`；两 PDF 无嵌入文件。B2 公开 HTML（499348 bytes）及 41 页扫描 PDF（3652993 bytes，SHA-256 `46a2c90f9bfd5efc26b1b2a72c1da98ff256db3b3899a4403223351cc9d9b343`）下载 200，扫描 PDF 无嵌入文件，B2 文字由公开 HTML 核对。PMC 对象清单 9 件（5 张发表 JPEG、原刊 PDF/XML/txt/JSON），无正式补件或原始数组。DataCite 精确关联 DOI、Zenodo 精确 DOI 与 Harvard Dataverse 精确题名检索均 HTTP 200、0 项；正式主文 p8 指向正文/补件、额外数据可请求作者，未发请求。原始二维 PSF、轴向峰位表、方向 MTF 数表与采样处理仍未定位。

[PMC 对象](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC7840120) · [授权版 PDF](https://patentimages.storage.googleapis.com/1b/f4/71/b8cc9b3189f1dc/US11774635.pdf) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1126%2Fsciadv.abe4458%22) · [Zenodo](https://zenodo.org/api/records?q=%2210.1126%2Fsciadv.abe4458%22) · [Harvard Dataverse](https://dataverse.harvard.edu/api/search?q=%22Meta-optics+achieves+RGB-achromatic+focusing%22&type=dataset)
