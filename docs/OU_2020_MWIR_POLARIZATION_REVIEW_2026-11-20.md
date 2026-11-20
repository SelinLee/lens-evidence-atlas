# Ou 2020 中红外偏振复用消色差器件

Kai Ou 等，*Science Advances* 6, eabc0711，DOI `10.1126/sciadv.abc0711`，2020-09-11 发表。2026-11-20 核 Crossref 151 次、OpenAlex 158 次。以两只实物轴向测量和折射率色散、共振相位色散联合匹配为证据，纳入经典中红外研究。主文、补件和媒体存档共用一个文献编号。[期刊](https://www.science.org/doi/10.1126/sciadv.abc0711) · [PMC 主文](https://pmc-oa-opendata.s3.amazonaws.com/PMC7486104.1/PMC7486104.1.pdf) · [Crossref](https://api.crossref.org/works/10.1126/sciadv.abc0711) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1126/sciadv.abc0711)

## 实物、照明与焦位

| 配置 | 镜径 | 设计焦距 | 两个实测偏振通道 |
| --- | --- | --- | --- |
| BAFOV 同轴聚焦 | 200 μm，主文 p.4 | 200 μm，两个通道相同 | x 方向实心焦斑，拓扑荷 0；y 方向环形焦斑，拓扑荷 2 |
| BAFS 偏振分束聚焦 | 补件 Fig. S3a 仅给 SEM 与 18 μm 比例尺 | 200 μm，两个通道相同 | x／y 方向分居光轴两边，名义出射角 −5.5°／+5.5° |

BAFOV 的空气侧圆孔几何 NA 为 0.447，由本库用口径及设计焦距估算。主文 p.5 指向的分束器 SEM 图号有交叉引用差异，实际 Fig. S3 位于补件 p.7 §S2。原文未给 BAFS 有效口径和 NA 数值。期刊 p.2 Fig. 1b 给全硅结构层高为 4500 nm，p.4 给椭圆柱阵列周期 1650 nm，p.7 给台阶仪确认的原晶圆厚 500 μm。

主文 pp.4–6 以 1023 K 黑体和六个带通滤片照明，中心为 3500／3750／4000／4250／4500／4750 nm。样品距 2 mm 黑体光阑 250 mm，作者近似为准直正入射。MCT 相机采集焦场，轴向步长 2.5 μm，以样品成清晰像时定位器件面 z=0。公开材料未给滤片在实际系统下的加权谱或横向采样尺度。3.5–5 μm 为连续设计范围，5000 nm 只出现在模拟，六滤片两个偏振的实验行分别登记。

Fig. 3c 的横轴为滤片中心波长（μm），纵轴为焦距（μm），上下半分别为 x／y；图注将误差棒定义为焦强保持最大时的轴向距离范围。作者在比较实测与模拟的段落写出相对平均焦距最大偏差 5%。Fig. 5d 的主文段落写出相对平均焦距偏差 1%–6.5%。两图均含实测与模拟，百分数未明确归属哪一系列，保留作者原称及参照说明，留空数值坐标。补件 Fig. S4 给 BAFOV 的 1%–6.5%，Fig. S6 给 BAFS 的 1.5%–6.5%，两项是模型。各波长的实测焦长、绝对轴移与截线 FWHM 未见数表。

[主文 Fig. 3](https://pmc-oa-opendata.s3.amazonaws.com/PMC7486104.1/PMC7486104.1.pdf#page=4) · [主文 Fig. 5](https://pmc-oa-opendata.s3.amazonaws.com/PMC7486104.1/PMC7486104.1.pdf#page=6) · [补件 Fig. S3](https://pmc-oa-opendata.s3.amazonaws.com/PMC7486104.1/abc0711_SM.pdf#page=7)

## 横移、焦斑和隔离比

BAFOV Fig. 3f 的宽度为实心 x 偏振通道。4000 nm 的 y 偏振有归一化环形焦斑截线（Fig. 3e），环内和环外的宽度均无原文数值。BAFS Fig. 5e 以焦斑中心相对于光轴的 x 位移为纵轴（μm），比较实际左右输出位置与作者的 ±F tan Θ₀ 关系。该出射角属于偏振分束功能；两通道逐波长有符号横移和跨波长残差未取得数值。Fig. 5g 的 x-cut、y-cut 宽度分别由两偏振焦斑的横纵截线得到。实测、模拟和理想参考各按原图图例区分。

BAFS p.1 和 p.6 明报实测偏振隔离功率比最高 21（Fig. 5f）。分子为所选通道焦斑中心、直径为 FWHM 的圆区功率，分母为关于 y 轴镜像位置的相同圆区功率；正文汇总文字未指明达到最大值的波长、偏振或 FWHM 截向。原始光度与实物聚焦效率留空。单元模拟透射也另有定义。

[Fig. 5e–g 与隔离定义](https://pmc-oa-opendata.s3.amazonaws.com/PMC7486104.1/PMC7486104.1.pdf#page=6)

## 原始数据入口

独立无头 Chrome 取得 PMC 正式八页 PDF（SHA-256 `495557c9feb01ec677f822508aa6399fe7cad76bcfe4fc474b828caf3d7388ac`）、11 页补件（`374279d9d21e75689d496a69a9802ca44a3b0296e54b743157988a0a6ca91a34`）和媒体清单。核主文及补件 PDF 均无嵌入文件，PMC 清单的附件为五张图、补件 PDF 和 Movies S1–S6，六支 MP4 均已取得。S1/S4 的 640×512 H.264 预览帧可见焦斑，主文指定视频采集过程为偏振旋转。图版、视频及元数据未给逐帧轴向位置和 PSF 标定。DataCite 精确 DOI 关联查询为 0。主文 p.8 允许向作者请求额外数据。逐色最佳焦位、轴扫栈、PSF 图像标定、MTF、Strehl 和实物聚焦效率待补。

[PMC 媒体清单](https://pmc-oa-opendata.s3.amazonaws.com/PMC7486104.1/PMC7486104.1.json) · [DataCite 检索](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1126%2Fsciadv.abc0711%22)
