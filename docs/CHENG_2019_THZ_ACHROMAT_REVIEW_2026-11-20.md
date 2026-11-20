# Cheng 2019 太赫兹消色差实物

Qingqing Cheng 等，*Science Bulletin* 64(20), 1525–1531。DOI `10.1016/j.scib.2019.08.004`，2019-08-09 正式上线。2026-11-20 查 Crossref 141 次、OpenAlex 149 次。正文 §3 与补件 §C 给出实制 C 形和矩形硅器件的轴向强度与相位实验，按经典原始研究纳入。[正式 PDF](https://dsl.nju.edu.cn/litao/papers/Cheng_QQ-SCIB_64_1525%282019%29.pdf) · [正式补件](https://ars.els-cdn.com/content/image/1-s2.0-S2095927319304621-mmc1.pdf) · [Crossref](https://api.crossref.org/works/10.1016/j.scib.2019.08.004) · [OpenAlex](https://api.openalex.org/works/https://doi.org/10.1016/j.scib.2019.08.004)

## 样片和实测工况

主文 §2 及 Eqs. (1)–(3) 采用几何相位设置基准波前，用随频率线性变化的单元相位补偿轴向色差。两只高阻硅样片同晶圆相邻制造。C 形实物直径 10 mm、设计 NA 0.385、名义焦距 12 mm，沿空气中圆孔与焦距算得的几何 NA 为 0.3846。矩形实物的设计 NA 0.43、设计焦距 10.5 mm，通光口径的明确原值仍待核。补件 Table S4 的外部表题称 Table S4，内表首格另印 Table S2。两镜蚀深 550 μm，C 形晶格周期 100 μm，矩形 x/y 周期 90/104 μm。[原文 §§2–4](https://dsl.nju.edu.cn/litao/papers/Cheng_QQ-SCIB_64_1525%282019%29.pdf#page=2) · [补件 Tables S1–S4](https://ars.els-cdn.com/content/image/1-s2.0-S2095927319304621-mmc1.pdf#page=2)

连续设计频带为 0.3–0.8 THz。两枚镜在 Figs. S3–S6 分别公开 0.3、0.4、0.5、0.6、0.7、0.8 THz 六列实验图。正文频带两端另印 375 和 1000 μm，已保留原始标称值。其余谱点的波长由真空光速换算，保留原图 THz 标签。近场探针采集的 x、y 栅格步距均为 0.25 mm。正文称探针距样片约 3 mm，轴向扫描步距、零位校准、传播计算和取峰流程仍待核。[主文 §3](https://dsl.nju.edu.cn/litao/papers/Cheng_QQ-SCIB_64_1525%282019%29.pdf#page=3) · [实测补件](https://ars.els-cdn.com/content/image/1-s2.0-S2095927319304621-mmc1.pdf#page=8)

## 实测结果与对照

- C 形器件的补件 Figs. S3/S4 用 12.5 mm 作焦面标线和相位截面。这个位置与 12 mm 名义焦长分别记录。主文 Fig. 4d–f 标出 0.3／0.6／0.8 THz 的横向 x 截线 FWHM 为 1.3／0.66／0.51 mm。其中 1.3 mm 也在 §3 明报。横向图以任意单位给强度，补件轴图用相对 Min/Max 色阶。
- 矩形器件 §4 和 Fig. 5e 明报 0.5 THz 的实测焦长约 10.5 mm。Fig. 5b 的实验横向宽度为 1.05 mm，仿真为 0.6 mm。矩形补件 Fig. S5 另给六频率轴图，Fig. S6b 的 12.5 mm 是相位截面。六频率独立峰位及残余跨度仍无公开数表。
- C 形器件 Fig. 4j 给频率（THz）对效率（%）曲线。作者报告峰值 >68%。§3 对 0.6 THz 给出 `ΣI_E/Σ(I_ref × n_si)`，焦面线圈在 Fig. 4l 标出直径 1.5 mm。参考项是硅片透射，文中未说明这里的参考积分域及折射率因子具体处理。逐频率数值留空。Fig. 4l 的 LCP 聚焦与 Fig. 4m 的 RCP 发散各按原图条件理解。
- 补件 §B、Fig. S2 的普通 PB 对照只做了模拟。0.3 与 0.8 THz 的模型焦位分别为 5.0 与 14.5 mm，模型跨度 9.5 mm，留在同文模型说明。

[主文 Fig. 4、Fig. 5](https://dsl.nju.edu.cn/litao/papers/Cheng_QQ-SCIB_64_1525%282019%29.pdf#page=5) · [补件 Figs. S2–S6](https://ars.els-cdn.com/content/image/1-s2.0-S2095927319304621-mmc1.pdf#page=7)

## 原始数组核查

本机独立无头 Chrome 取得南大正式版和 Elsevier 补件，均为 HTTP 200。主文 2608544 字节，SHA-256 为 `74bed4fa333bd1f6eb3dd6ccd24f3e83ffcdbad33b29b6e499e19cb58caf58fb`。补件 988718 字节，SHA-256 为 `fb0757e3265946509cd18f27702eb60962c31ffa65ad0e2113b2ff87ab57903a`。出版页请求返回 403，试过的南大初稿路径返回 404。正式版 Appendix A 指向期刊补件。PDF 内无嵌入附件，DataCite 精确 DOI 关联查询为 0。逐频率轴峰、效率数表、PSF 原数组、Strehl 和 MTF 仍待核。[正式版 Appendix A](https://dsl.nju.edu.cn/litao/papers/Cheng_QQ-SCIB_64_1525%282019%29.pdf#page=6) · [DataCite](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1016%2Fj.scib.2019.08.004%22)
