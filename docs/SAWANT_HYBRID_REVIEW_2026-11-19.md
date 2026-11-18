# Sawant 2021 的厘米级折超混合色差校正

Sawant 等人发表在 *Optica* 8(11), 1405–1411，DOI 10.1364/OPTICA.434040。正式在线日期为 2021-11-03，2026-11-19 查 Crossref 引用数 92。沿 Zhang 等 2025 年可见光折超混合研究的引文定位，按 DOI 和题名查数据库、待办和指定本地参考文献目录。按经典研究例外纳入，依据为厘米级实制折超混合镜、宽带轴向扫描和裸镜对照。[Chalmers 馆藏](https://research.chalmers.se/en/publication/527384) · [Crossref](https://api.crossref.org/works/10.1364/optica.434040)

## 口径、色差和测量范围

主文 p1406 §2 给出 1 cm 的超表面校正器、半英寸的熔融石英平凸镜及 23 mm 球面曲率半径。裸镜在 600 nm 的标称焦距为 50 mm。LCAM 的 NA 约 0.1，见 p1410 对 600–800 nm 的总结。CAM 和 SAM 的相位曲率符号相反，主文指出两个混合镜的焦距相对裸镜各有变化，详细光线追迹指向补件 Fig. S3。混合镜绝对焦距留空。方格周期 440 nm，光刻胶 ma-N 2410 纳米鳍的设计尺寸为 350 × 100 × 1700 nm。[正式主文 p1406](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=3) · [p1407](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=4) · [p1410](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=7)

Fig. 2b–c 给出裸镜与 LCAM 自 550 至 800 nm 每 25 nm 的轴扫，共各 11 个谱点。横轴 `Wavelength [nm]`，纵轴 `Normalized z [mm]`，颜色为各波长单独归一的强度。正文用轴向强度最大值取焦。图版为嵌入的光栅图，未附逐点峰位、绝对原点和轴向采样。保留两组谱点与图号，逐波长绝对焦位及有单位的残余色差留空。作者的色差校正量是 `1 − Δf_hybrid/Δf_lens`，两项 Δf 都取 600 和 800 nm 的焦位差。摘要与 §3 称至少 80%，引言称最高 80%，结论写 80%。数据库保留 §3 的测量依据与措辞差异。[Fig. 2b–c](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=5)

PSF 光路采用超连续光源、5 μm 针孔、40×/NA 0.75 物镜、管镜和可轴移 CMOS。混合镜用左旋圆偏振入射并检出交偏振的右旋一级光。正文的准直透镜出现 30 cm 和针孔判据中 200 mm 两种记载，物方采样待核。LCAM 的轴向焦区展宽。p1409 正文结合 Fig. S7 报告球差分量约增加 20%。Fig. 4b–c 用 550–800 nm 照明比较 USAF 靶，采用彩色 CMOS，作者报告交偏振选择不完全造成的背景。横向 FWHM、定量横向色差和 LCAM MTF 待补。[Fig. 2](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=5) · [p1409](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=6) · [Fig. 4](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=7)

## 球差对照、聚焦效率和原始材料

LSAM 为独立的单色球差校正配置。Fig. 2d–e 测量 650 nm 下径向距离 [μm] 与归一 z [mm] 的强度图。p1409 指出 Fig. S5 的 MTF 用 LSAM 和裸镜的实测 PSF 做傅里叶变换。频率单位、方向、归一化、选面与数表须等补件正文核实。Fig. 3 的 617 nm QLSI 采用约 7.5 mm 测量瞳，扣除离焦。作者报告 LSAM 的球差分量约减 70%。Fig. 4d–e 的准单色靶照为 650 nm、10 nm 带宽。Fig. 4e 图注写 LCAM，正文及图内球差分组支持 LSAM 归属。[Fig. 2d–e](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=5) · [p1409 与 Fig. 3](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=6) · [Fig. 4d–e](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=7)

p1409 给出的实测效率为 LCAM 在 550–800 nm 约 8.5%，以及 LSAM 在 650 nm 约 20%。LCAM 原文未定义跨波长聚合性质，保留原述，均值数值列留空。两个配置的焦圈、参考功率和效率测量偏振均待核。Fig. 1c 给出的约 10%–25% 属于均匀纳米鳍阵列的偏振转换效率。[p1409 效率段](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=6) · [Fig. 1c](https://research.chalmers.se/publication/527384/file/527384_Fulltext.pdf#page=4)

馆藏正式版 `527384_Fulltext.pdf` 共 8 页，前一页为封面，正文 7 页。实际下载 11922803 字节，SHA256 为 `3d20762fc3f5790264332c2e5d7dc4c055919f82646ed5f07a21e1fa13d6edcf`，无嵌入附件。正文内链及 DataCite 定位到 Supplement 1 `5436264.pdf`。Figshare 条目、变体下载及集合文章查询返回 403，期刊直连为浏览验证页，补件正文尚未取得。DataCite 关联查询返回三个集合 DOI，HAL 文件索引仅列主文稿，OpenAlex 可复查期刊、HAL 和 Chalmers 索引。p1410 Data Availability 指向作者合理请求。逐点峰位、原始 PSF 与物方尺度、MTF 数表、聚焦效率协议及横向色差待补。新增一篇、3 个配置与 33 条证据记录。[补件 DOI](https://doi.org/10.6084/m9.figshare.16613320) · [补件元数据](https://api.datacite.org/dois/10.6084/m9.figshare.16613320) · [DataCite 关联查询](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1364%2FOPTICA.434040%22&page%5Bsize%5D=25) · [HAL 索引](https://api.archives-ouvertes.fr/search/?q=doiId_s%3A10.1364%2FOPTICA.434040&fl=halId_s,uri_s,fileMain_s,files_s)
