# Chen 2021 GaN 消色差子镜阵列与光场边缘重建

**准入：经典可见光原始研究。** Chen et al., *Edge detection with meta-lens: from one dimension to three dimensions*, Nanophotonics 10(14), 3709–3715, DOI 10.1515/nanoph-2021-0239，2021-07-22 正式在线。2026-11-25 直接查询 Crossref 57 次、OpenAlex 64 次，均超 50；不依赖当前期刊分区。正式版 §2.1、§3 直接报告光学消色差设计、制备和实测，非仅靠白光图像重建。一个文献编号，两个配置（子透镜阵列、光场系统），五条记录。配置计数不是独立制造样片计数。[正式版](https://scholars.cityu.edu.hk/ws/portalfiles/portal/88064516/82616928_2_.pdf) · [Crossref](https://api.crossref.org/works/10.1515/nanoph-2021-0239) · [OpenAlex](https://api.openalex.org/works/W3201090022)

## 方法与去重

- 印刷 p.3710 §2.1 Eq.(2)：PB 几何相位结合 GaN integrated resonant units（IRUs）的波长依赖相位补偿，使不同波长对应同一设计焦距。60×60 子镜；单镜名义直径 21.65 μm，设计 f=49 μm，400–660 nm 连续设计范围。印刷 p.3712 Fig.2a–d 给出阵列与纳米结构 SEM，已核图；蓝宝石基底。
- 与 Lin 2019（DOI 10.1038/s41565-018-0347-0）同组、同名义几何与相同相位机制。核原版 SEM 图，Chen Fig.2 和 Lin Fig.1 所示图像视角/区域非已核同图；前者原文明确列出设计、制备及测量贡献。Lin 2019 作者报告带内 operation efficiency 39.1±1.8%，光场数据规格 55×40 / 87 像素，与 Chen 的 38.9%、56×38 / 96×96 不同。**样片编号未对齐，物理阵列是否再制备尚不能断定**；保留独立研究的独立报告，不能继承 Lin 的测量明细和 NA，也不把同设计当新技术。Lin 原文 [作者组 PDF](https://dsl.nju.edu.cn/litao/papers/Lin_RJ-nnano-14-227%282019%29.pdf) 2,127,835 字节，SHA-256 `50aa2038b3ff8a4c17753be9bc1adce9d2c62c71fcd5d0abc6eadff3c1a1c62d`。
- 用作者 D、设计 f 核量纲，空气中几何 NA = sin(arctan(10.825/49)) ≈ 0.2157，仅一致性检查；本文未报 NA 原值，不将算值或 Lin 2019 值填作者实测 NA。§2.2 有中间像至阵列 a=300 μm、阵列至采集面 b≈58.56 μm 的有限共轭设计，1/(1/49−1/300)≈58.5657 μm；保留作者 b，非 EFL、非实测焦移。

## 原文光学测量

| 作者报告 | 值 | 原文与边界 |
| --- | ---: | --- |
| 工作带实测焦距 | 49.01 ± 0.92 μm | 印刷 p.3711 §3 首段，Fig.S3 引文。原文没有定义中心为算术均值或 ± 为 SD、SE、峰峰半宽；标独立带内中心报告，统计和谱点清单待核。 |
| 平均 operation efficiency | 38.9% | 同段。出射焦区圆偏振功率除以相反手性入射光功率；带内平均明确，逐点数值、权重、焦区积分尺度、入射功率测量范围、重复数未知。独立 operation 字段，不能直接视为不分偏振的口径内总入射聚焦效率。 |

未取得实际 Fig.S3，未知逐波长实测峰位、参考面、轴扫步长、波长采样、误差定义、最大残余色差、原始 PSF/FWHM、MTF、Strehl 与逐色效率。正文 400–660 nm 不等于逐点测量名单；±0.92 不乘二当残余焦差。光学实测带内报告足以说明作者实际进行了消色差器件验证，但不能推出完整的残余色差曲线。[PDF p.3–4](https://scholars.cityu.edu.hk/ws/portalfiles/portal/88064516/82616928_2_.pdf#page=3)

## 光场成像与边缘重建

§3 白光非相干照明通过 LP/QWP 得到圆偏振，输出检偏；Fig.3、Fig.4 的像素差分和视差渲染是数字后处理。Fig.4a 第一行 A（黄色实际物深 20 cm）同次采集重建深度 20、25、47 cm，右栏作者文字给峰值信号灰度／背景噪声值 15、7.8、4.2（无量纲）。Fig.4b 横轴位置(pixel)，纵轴灰度；不是裸镜 PSF 或 MTF。C/E 图案其余六个柱值仅图，不估读。图案 A 的各深度另列三个同配置记录；不把重建深度认作光学像面移动，不把作者 SNR 转成 dB、PSNR 或背景 SD 归一 SNR。背景噪声统计、ROI 坐标、曝光、增益、误差和重复计数未核。相较单镜，对应实际成像条件不同，不能用重建 SNR 归因给某个波长的残余色差。[Fig.4 PDF p.6](https://scholars.cityu.edu.hk/ws/portalfiles/portal/88064516/82616928_2_.pdf#page=6)

## 查过的原始数据入口

- CityU 机构公开正式版经本机独立无头 Chrome HTTP 200 下载；2,533,836 字节，SHA-256 `164e4740f5dbab7ad0def8885fe38d3c750b145518e5b70fe7cb055aad95caa3`。含一页机构封面和七页期刊版；实际视觉核 PDF pp3–6（印刷 pp3710–3713）Figs.1–4；零 PDF 内嵌文件。
- [PolyU 机构馆藏](https://ira.lib.polyu.edu.hk/handle/10397/92131) 明确载正式版本并给 [PDF](https://ira.lib.polyu.edu.hk/bitstream/10397/92131/1/10.1515_nanoph-2021-0239.pdf)；检索工具读到七页，独立 Chrome PDF 请求超时。
- [De Gruyter 原刊](https://www.degruyterbrill.com/document/doi/10.1515/nanoph-2021-0239/html) 正文可由检索工具阅读，本机 HTTP 202 空体；[Wiley 正式登记](https://onlinelibrary.wiley.com/doi/10.1515/nanoph-2021-0239) 显示补件 `nap2bf00271-sup-0001.docx`，2.5 MB。直链 403，旧站候选补件路径亦未取得。主文引 S1–3（设计/制备/测量）、S4（光路）、S5–7（重建），S9（边缘截线）；文件未实取，不声称其中有数值表。作者数据可用性声明为合理请求通讯作者；此批未联系作者。
- [DataCite 精确关联 DOI 查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1515%2Fnanoph-2021-0239%22) 和 [Zenodo 精确 DOI 查询](https://zenodo.org/api/records?q=%2210.1515%2Fnanoph-2021-0239%22&size=5) 皆实查 HTTP 200、零项；不等同全网无数据。继续找作者存档补件 S3 和原始轴扫、偏振功率及光场数据。
