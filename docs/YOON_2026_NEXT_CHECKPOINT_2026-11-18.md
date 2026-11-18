# Yoon 2026 正式发表版与公开数据入口

QUALITY-001z，2026-11-18。入选理由是可见光毫米口径实制镜、两种同几何对照、不同物深的 PSF 和公开数据入口。独立核验有助于区分镜片聚焦、滤波和计算成像的贡献。未使用引用量或期刊影响因子。按 DOI、题名及 arXiv 编号去重。库和用户 08_references 文件名未见匹配，后者为限定范围。

- [正式论文](https://www.nature.com/articles/s41467-026-76606-0) *De-occluding broadband metalens*，Yoon、Kang 等，*Nature Communications* 17, 9808，2026-08-15。期刊页面、Crossref 和 Europe PMC 均取到 200，DOI 同为 10.1038/s41467-026-76606-0，PMCID PMC13575167。初读正式版实验段、Fig. 4 图注和 Data/Code availability。
- [期刊 PDF](https://www.nature.com/articles/s41467-026-76606-0.pdf) 与 [PMC PDF](https://pmc-oa-opendata.s3.amazonaws.com/PMC13575167.1/PMC13575167.1.pdf) 无头请求均为 200，9,359,309 字节，10 页，逐字节一致。主文 SHA256 为 2b1e21b444b53af5fd0075fbc83f4708281c6d736ad408ec75191380efe886a9，未见内嵌附件。[PMC 元数据](https://pmc-oa-opendata.s3.amazonaws.com/PMC13575167.1/PMC13575167.1.json) 标记 is_manuscript=false 和 is_retracted=false。[对象目录](https://pmc-oa-opendata.s3.amazonaws.com/?list-type=2&prefix=PMC13575167.&max-keys=100) 未截断，共 18 项，列 SI、五个视频、同行评议和六张图。出版方 SI 请求取得 200 响应头，但约 129 MB 下载超时，PMC SI 镜像继续查验。
- [arXiv v2](https://arxiv.org/abs/2601.19403) 为 2026-10-04 接收稿，取到 20 页 PDF，封面链接上述 DOI。检索旧题名 *Learned split-spectrum metalens for obstruction-free broadband imaging in the visible* 也指向同一 arXiv 编号。已用正式主文继续核验。
- [GitHub v1.0.0](https://github.com/puostyoon/de-occluding-broadband-metalens-public/tree/v1.0.0) 标签指向 b476b8bbb6688b30b327ab6c2cdb3b137fc55eae。README 指向训练和测试图像的 `Meta_camera` / `GT_camera` 数据结构。[Zenodo 20823451](https://zenodo.org/records/20823451) API 200，元数据 v1.0.0，列一个 127,178,067 字节 ZIP，MD5 101c473d33ba68e0755af2836b98616e。仅核归档元数据。
- [公开 Drive](https://drive.google.com/drive/folders/1siNWBBHfKFFi4170p5rpSbTFk9WyrfSp) 独立无头匿名打开 200，正文实际列 Computer_vision_task、Metalens_phase_map、Neural_network_training_data、Neural_network_weights。一级目录不能判定原始 PSF 数组是否公开，子目录、具体文件和测量标尺待核。

正式主文 Fig. 4 对比同口径焦距的三种实制镜，图注分别写出 x–λ 图按总强度归一、二维图按峰值归一。接续时核 Fig. 4 原图、Supplementary Notes 8/9/12 和公开文件清单，分辨滤波通/阻带与实测谱点，记录物距、评价面、归一化/采样以及裸光学、传感器实拍和网络重建各自能支持的参数。当前未录正式数据格。
