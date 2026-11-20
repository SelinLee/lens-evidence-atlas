# Wang 2024 随机交织全息消色差镜

Xinghao Wang 等，*Laser & Photonics Reviews* 18(3), 2300880，DOI `10.1002/lpor.202300880`。2023-12-12 正式上线，2024-03 卷期，纳入日期符合滚动三年。采用 2025 年 3 月中科院升级版物理与天体物理大类一区。2026-11-20 查询 Crossref 57 次、OpenAlex 58 次。用 pp.4–7 的实测轴扫、同口径 Fresnel 对照和固定光路三色成像确认光学轴向色差校正。[期刊](https://onlinelibrary.wiley.com/doi/10.1002/lpor.202300880) · [分区版本](https://www.ais.cn/journal/database/5537) · [武汉大学图书馆分区](https://topj.lib.whu.edu.cn/show.asp?cat=sci&id=13647) · [Crossref](https://api.crossref.org/works/10.1002/lpor.202300880) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1002/lpor.202300880)

## 实物与轴向焦差

- §§2.2–2.3、Fig. 3a 与 §3 给名义设计焦距 60 μm、实物直径 32 μm。400／590／750 nm 是相位设计波长。共享孔径的三套双曲相位以 1:1.5:1 概率比交织，400 nm 为相位像素设计宽度，200 nm 为横向写点间距。用半径 16 μm 和设计焦距估算空气侧几何 NA，约 0.258，单独标记本库模型。§4 的 1.35 是光刻写入物镜。
- §4 配置以样片面为 z=0、CCD 步进 1 μm，采用滤片测试七个波长。Fig. 3d 画出轴向焦斑，Fig. 4a 图注给出共同焦区约 z=57 μm。逐色轴向最佳焦位未印数值，库中留空。
- p.5 的聚焦比较段报告 RIL 的最大相对焦距偏差为 5.26%，同口径单波长 Fresnel 对照为 15%。Fig. 4d 横轴为波长 nm，纵轴为有符号聚焦误差 %。结果句将 RIL 偏差参照描述为实测平均焦距，同段前句把定义描述为名义与实测焦距的归一化差。分母数值、逐点有符号误差和绝对峰位尚缺。两只实物分开归档，保留作者的两个汇总数值。
- Fig. 4a–c 展示七个横向焦斑、归一化 x 截线和 FWHM。横向宽度图的横轴为波长 nm，纵轴为 FWHM μm。逐点 FWHM、平均或逐点 Strehl、横向物方采样与 MTF 未取得原始数值。

[原文设计与实物 pp.3–6](https://mane.ustc.edu.cn/_upload/article/files/8c/03/317ceaf8400a895dd6b99fdce40b/3e2f5ffd-fe6d-46d3-bc09-35c9d31cd31a.pdf#page=3)

## 聚焦效率与成像

| 试验波长（nm） | 470 | 510 | 550 | 590 | 632 | 660 | 690 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 原文效率（%） | 54.7 | 46.9 | 52.9 | 63.7 | 52.6 | 50 | 48 |

数值逐格源自 p.4 §2.3 正文列表。Fig. 3e 内插图的分子是焦面半径 1.5×FWHM 圆内的积分。分母是样片面积乘以 z=0 面样片外的单位面积入射强度。图中阴影的统计含义未给。作者摘要和结论给平均约 55%。对同页正文七点等权计算为 52.685714…%，按 52.69% 记录核对结果；作者使用的谱权重或采样范围待核，汇总格保留两种出处及空数值。

§2.4 与 Fig. 5a,b 描述固定光路依次换 470／550／660 nm 滤片采集字样。Fig. 5d(ii) 的暖白 LED、USAF 1951 靶截线最细印字为 0.92 μm，作者称为分辨率。靶组、元素、对比阈值与场点未给。Fig. S12 指向另一组 2×4 实物阵列，主文未印阵列单元几何和逐色焦位，阵列另建一条记录。全部材料归同一个文献编号。[原文 Fig. 3](https://mane.ustc.edu.cn/_upload/article/files/8c/03/317ceaf8400a895dd6b99fdce40b/3e2f5ffd-fe6d-46d3-bc09-35c9d31cd31a.pdf#page=5) · [原文 Fig. 5](https://mane.ustc.edu.cn/_upload/article/files/8c/03/317ceaf8400a895dd6b99fdce40b/3e2f5ffd-fe6d-46d3-bc09-35c9d31cd31a.pdf#page=7)

## 原始数据公开核查

本机独立无头 Chrome 取得中国科大作者组网页第 12 条链接的九页正式在线 PDF，2784107 字节，SHA-256 为 `e71b367e4b31801e8ccda8135a179a5bd8fd0be2b81551c158b2142e471ff407`。视觉核 Figs. 3–5 与 §4。Wiley 主文目录给补件名 `lpor202300880-sup-0001-SuppMat.pdf`，登记 1.5 MB，目录下载及两个 Wiley 域名的文件入口返回 403。主文引用 S6 测试相关图、S9 Fresnel 对照、S11 白光对照和 S12 阵列。作者数据说明为向通讯作者合理请求。用 DOI、补件名和文章标题搜索，DataCite 精确关联 0 项，OpenAlex 仅索引期刊版，未定位公开轴扫数组、原始 PSF 或 MTF 数表。图示数据保留来源和留空字段。[作者组论文目录](https://mane.ustc.edu.cn/2023n/list.htm) · [补件入口](https://onlinelibrary.wiley.com/action/downloadSupplement?doi=10.1002%2Flpor.202300880&file=lpor202300880-sup-0001-SuppMat.pdf) · [DataCite 检索](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1002%2Flpor.202300880%22)
