# Hsu 2022 偏振复用双波长与同文对照

Ting-Wei Hsu 等，*PRX Quantum* 3, 030316，DOI `10.1103/PRXQuantum.3.030316`，2022-08-01 正式发表。2026-11-19 查询 Crossref 为 64 次、OpenAlex 为 75 次。凭实际制备与同面偏振复用实验纳入经典研究。所有材料共用一个文献编号。核 NSF 所存 APS 11 页正式版、NIST 作者稿、arXiv v2 和 JILA 发布的学位论文封面 2025 年版。旧站索引的学位论文封面为 2024 年，当前引用位置以本机核过的 2025 文件为准。[期刊](https://journals.aps.org/prxquantum/abstract/10.1103/PRXQuantum.3.030316) · [正式 PDF](https://par.nsf.gov/servlets/purl/10382306) · [Crossref](https://api.crossref.org/works/10.1103/prxquantum.3.030316) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1103/prxquantum.3.030316)

## 偏振复用实物

纳入消色差数据库的直接依据是附录 §12 Fig. 6。作者用单独制备的矩形柱超透镜演示正交偏振的双波长同面聚焦。主文的单原子捕获实验使用另一枚方柱样片。附录器件的实际原子捕获由作者列为后续工作。[正式版附录 §12](https://par.nsf.gov/servlets/purl/10382306#page=10)

- 附录 §12 与学位论文 §5.7.1 给出设计焦距 0.5 mm、NA 0.8，用矩形非晶硅双折射单元匹配 780 nm／x 和 850 nm／y。两设计波长是离散通道。器件的有效镜径没有明确原值。
- 正式 Fig. 6c,d 用 0.95 NA 实验接收物镜取得固定面横向 PSF，横轴为径向距离 μm，纵轴为归一化强度。学位论文 pp176–177 明确两次采集的针孔至超透镜距离相同，光路用 PBS 限制通道。沿轴扫描、两波长绝对最佳焦位和残余焦差未给原数。
- 正式 §12、后期 arXiv 作者稿及学位论文的 Airy 拟合段列 0.80±0.01 和 0.82±0.01，误差为拟合标准误。不把拟合 NA 当成几何设计 NA。第二通道的正式图内和正文写 850 nm，图注写 852 nm。学位论文亦保留同一处差异。第二测量波长数值栏留空，显示两个原值和各自出处。
- 正式 §12 报告 780 nm／x 为 42%、850 nm／y 为 45%。2022-08-15 NIST 作者稿的设计和效率段有偏振标签对调，后期 arXiv v2 与正式版的报告一致。学位论文 p176 讨论同设计样片及相同有效 NA，报告效率低于 20%。按作者原值并列登记。样片编号、各组复用测试的针孔尺寸及逐谱点原始功率尚未对齐，效率数值栏留空。学位论文只明确沿用 §5.5.3 的焦区功率／入射到基片总功率测法，Fig. 5.16 有两种接收光路。

[正式 Fig. 6 与 §12](https://par.nsf.gov/servlets/purl/10382306#page=9) · [JILA 学位论文 pp176–177](https://www.colorado.edu/jila/media/854#page=194) · [NIST 作者稿](https://tsapps.nist.gov/publication/get_pdf.cfm?pub_id=933071) · [arXiv 作者稿](https://arxiv.org/pdf/2110.11559v2)

## 未校正单镜及接收端补偿

正文 §§III–IV 的方柱单镜是另一只实物。学位论文 p151 与 Fig. 5.14a 报告圆形设计口径 4 mm、焦距 3 mm、NA 0.55。设计参数的量纲校核为 (2/\sqrt{2^2+3^2}\simeq0.555)，按空气中半径和名义设计焦距计算。附录 §9 作者通过移动 0.90 NA 复消色差物镜测得 780 nm 相对于 852 nm 的轴向位移 **+300 μm**。该值归同一未校正单镜的两点互差。逐色绝对峰位仍空。

| 配置 | 780 nm | 852 nm | 原文条件 |
| --- | ---: | ---: | --- |
| 未校正单镜聚焦效率 | 56% | 58% | 各谱点焦面 300 μm 针孔，分母为入射到基片的总功率，APS pp3–4 与附录 §5 |
| 未校正单镜作者 Gaussian 1/e² 半径 | 1.1 μm | 0.72 ± 0.02 μm | 两个相隔 6.86 μm、直径各 300 nm 的针孔给参照，APS pp3–4 与附录 §5 |
| 加 L1 的 780 nm 成像 | 1.1 ± 0.07 μm | 参考位置 | 双针孔置于裸镜 852 nm 焦位，由 780 nm 照明。作者称 PSF waist，APS p9 §9 |

学位论文 p158 Table 5.1 的空间滤波列同样是 56% 和 58%，后者表列波长写 850 nm，前者的论文叙述写过 54%。这批保留 APS 明报的 780／852 nm 和其明确的原刊协议。折射 L1 的 EFL 为 150 mm，放在距超透镜 111 mm，补偿同文方柱样片的接收端离焦。该系统配置保留实际 PSF 半径和参考通道。轴向残差、MTF 和 FWHM 无原数。

[正式 §§III–IV、附录 §§5、9](https://par.nsf.gov/servlets/purl/10382306#page=3) · [学位论文 Table 5.1](https://www.colorado.edu/jila/media/854#page=176)

## 原始数据入口

正式版与 JILA PDF 经本机独立无头 Chrome 取得。NSF 正式版 SHA-256 为 `838d5769725ffaea54c0898e05b5f2c9f4baa428cd66d979b7cd446efd22c308`。JILA 学位论文为 15580405 字节，SHA-256 为 `e09f9fac7232ef7fb22236e13c8b83b5f76e384af08621941c75068f45a15f3b`。DataCite 精确关联命中一项 arXiv 文字版本，Zenodo 精确词搜索命中另一研究的引用文本，核过范围未定位属于本研究的原始 PSF 和效率数组。[DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1103%2FPRXQuantum.3.030316%22) · [JILA 学位论文目录](https://www.colorado.edu/jila/regal-group-theses)
