# Colburn2018：经典可见光波前编码、PSF/MTF与复原的检查点

QUALITY-001t；2026-11-15。接续Javed2026长焦深/分布焦位研究，回查经典计算消色差方案；具体任务只入待办/日志，长期目标保持active。

[Colburn, Zhan & Majumdar, Metasurface optics for full-color computational imaging](https://doi.org/10.1126/sciadv.aar2114)，Science Advances **4(2),eaar2114 (2018)**，DOI **10.1126/sciadv.aar2114**。PMC题头/作者托管正式排版PDF题名、作者、年份及文章号一致。选择理由：早期可见光单镜与数字滤波联合设计、EDOF与普通singlet对照，能回到PSF/MTF与色差影响问题；本文实际参考24列出已录Avayu2017（Nat.Commun.8,14992），作为其后续引用扩展，不使用引用量/IF。

最新data/题录及只读08_references按DOI/完整题名无器件记录匹配。不是把同作者Tseng2021或一篇综述另当原作数据。

## 已取得与实际读取范围

- [PMC原始存档](https://pmc.ncbi.nlm.nih.gov/articles/PMC5817919/)：独立无头Chrome导航203，取得38162字符正文/图注/附件链接，非验证页。
- [作者UW实验室托管主文](https://labs.ece.uw.edu/amlab/Papers_Journals/Shane_Full_color_imaging.pdf)：本机Chrome request200，571626字节，PDF魔数/元信息核**7页**，SHA256=`88dba7698443995f5e09baa3a310ca5b82d2850d921e81145e858b7882cdf8cb`。正式AAAS排版，页眉/底注2018，不借爬取日期改发表年。
- 主PDF仅在`/tmp/lens-mtf-audit/colburn2018-main.pdf`；已提取文字。只初读摘要、相关设计/MTF关键词定位、Data and materials availability及参考24，**尚未视觉核图或完成方法拆解，未录器件/数值**。
- PMC实际链接的SI `aar2114_SM.pdf`（`/articles/instance/5817919/bin/aar2114_SM.pdf`）独立request403/358字节，未取得有效PDF；不填写SI哈希或声称已读。后续可查出版方/作者正式入口，并等待网页DOM后定位CDN原图，不能把短等待无图当无公开图。

## 下一步核查

1. 将普通singlet、cubic-phase EDOF、不同编码强度及数字复原配置分开；同一实物/处理链不虚增论文或器件。区分光学焦点色移、波长不敏感PSF/MTF和复原彩色成像，不能把计算复原称裸镜零色差。
2. 视觉核主文关键图、设计口径/NA/f、材料/高度及实际测量λ。摘要约NA0.45还未写入数据；文本提取出现200“mm”一类μm误码，必须核原页单位，不据文本直接录值。
3. 对齐实测/理论PSF和MTF的方向、场点、频率单位、固定/最佳焦面、归一化及光谱线宽；SI S8标题涉及非零光源带宽下理论/实验MTF，原附件仍缺，不能仅凭标题采数。
4. 核效率积分范围、功率分母、平均采用的实际λ与重复/误差；不把均值复制为逐λ效率。
5. 主文Data and materials availability称评估结论所需数据在主文/SI，额外数据可向作者请求；这不自动意味着原始二维PSF/数值MTF已公开。原始数组、采样标定、处理/代码与作者关联仓库尚未系统查，未联系作者/估图/复算。

下一步先核图/方法/附件与数据公开范围，再沿现有一篇一编号格式录入；本检查点不替代完成一批验收。
