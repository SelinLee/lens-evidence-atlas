# Barulin 2024 的双波长荧光超透镜

Aleksandr Barulin、Yeseul Kim、Dong Kyo Oh 等，*Dual-wavelength metalens enables Epi-fluorescence detection from single molecules*，*Nature Communications* 15, 26，2024-01-02 正式上线。DOI `10.1038/s41467-023-44407-4`。来自 Zang 与 Xia 2026 的参考文献 24。当前器件库按 DOI 与标题去重无匹配。2025 年 3 月中科院升级版为综合性期刊大类一区。正文明确描述两种波长的色差校正，Fig. 3d 展示同一实物的两色轴向扫描。[正式主文](https://pmc.ncbi.nlm.nih.gov/articles/PMC10761847/) · [2025 年分区](https://www.ais.cn/journal/database/8402)

## 一只实物的两条焦场测量

正文 p.2 给圆形口径 500 μm、设计焦距 330 μm、NA 0.6。以同偏振的传播相位匹配 635 和 670 nm 的两套目标相位，实物采用玻璃基底和氢化非晶硅（aSi:H）纳米柱，设计周期、高度分别为 300、500 nm。正式 p.6 Methods 另给 600 nm 起始沉积膜厚，刻蚀后柱高缺原数。Fig. 2a–c 给光学与 SEM 图。按空气中几何口径与焦距计算，NA 约 0.604。同行评议文件 pp.10–11 的作者答复明确 NA 0.6 取几何口径与焦距。正文按 635 nm 激发和 670 nm 收集设计，这两个谱点为离散光学测量点。[正式 PDF pp.2–5](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/PMC10761847.1.pdf#page=2) · [作者答复](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/41467_2023_44407_MOESM2_ESM.pdf#page=10)

| 波长 | 水平截线的 FWHM | 作者所报实测焦位 | 实测聚焦效率报告 |
| --- | ---: | --- | --- |
| 635 nm | 0.77 μm | 约 330 μm | 正文 p.3 为 14.2%，Table S1 为 14.1% |
| 670 nm | 1.03 μm | 约 330 μm | 正文 p.3 与 Table S1 均为 37.1% |

正文 p.3 叙述两个焦位均在 330 μm 处且近乎匹配。正式 p.5 Fig. 3a,b 是 x–y 归一化强度图，Fig. 3c 是两者的水平截线，Fig. 3d 列 635 和 670 nm 的 x–z 图。轴向横坐标 z 标 320、330、340 μm，强度色标 0–1。图注及 p.7 Methods 给轴向 1 μm 扫描步长。635 nm 的轴向亮区较长，两个色图的峰位没有带误差的数值表。保留作者约 330 μm 的报告和设计焦距两项，精确逐色峰位及残余轴向差留空。p.7 Methods 与补充 Fig. S8 给 100×、NA 0.8 接收物镜、筒镜和 sCMOS 成像链，轴向起算标定及横向物方像素间距未获。[焦场 Fig. 3](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/PMC10761847.1.pdf#page=5) · [轴扫方法](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/PMC10761847.1.pdf#page=7) · [补件 Fig. S8](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/41467_2023_44407_MOESM1_ESM.pdf#page=9)

## 效率和配置归属

正文 p.3 把焦斑捕获光量除以进入超透镜的入射光量。正文和补件未读到积分半径、功率采样标定或 635 nm 两值差异的解释。补充 PDF p.14 Table S1 的第一行明确为本作 635／670 nm、500 μm、NA 0.6 实物。公开审稿文件 p.22 重列相同 14.1%／37.1%。635 nm 的两项报告均带出处，数值格留空，670 nm 录入 37.1%。同作者美国公开申请 US20260160684A1 的镜像表 3 也列 14.1%／37.1%，本机无头 Chrome 请求 USPTO 原 PDF 返回 403。正文 p.2 的透射率与偏振转换效率来自纳米柱库建模，另有独立定义。[正式文中效率](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/PMC10761847.1.pdf#page=3) · [Table S1](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/41467_2023_44407_MOESM1_ESM.pdf#page=14)

Fig. 1c 与 Methods 的显微系统加入消色差双合透镜改变束径，以 80 μm 共焦针孔检测 655–700 nm 名义荧光谱段。Methods 给 200 mm 双合透镜、190 mm 间距、作者计算的 6.45 mm 组合有效焦距和 31× 系统倍率。它属于系统配置。作者答复 pp.12–13 说明收集谱带内部仍有残余色差，FCS 有效体积还取决于收集通道、激发和针孔，不提供残余轴向焦移数值。评议 PDF pp.23–25 和 30–31 另有拼接过的试片图及试聚焦，答复把直径印为 1.1 μm，同时叙述目标为直径至少 1 mm 且约为 500 μm 的两倍。该冲突和 Fig. Rvs 3 缺标尺、波长、焦位定义的问题留在补证记录。[显微光路](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/PMC10761847.1.pdf#page=3) · [其他试片](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/41467_2023_44407_MOESM2_ESM.pdf#page=30)

## 公开材料

独立无头 Chrome 取得 PMC 正式 PDF 2358845 字节，SHA-256 `6487fdb0dfafbf585dc9139960fba67abd03b621d09bc0f3efd30b2bdca6a59a`。补件 5921944 字节，SHA-256 `76d480a8fa8fe7ff8b784938396bda1aba1a46111631635a9e41751ee1c08b17`。公开审稿文件 7810828 字节，SHA-256 `c46b58d6a15a0316a0e270a760020cc05fb64746896e175c6206efc3018c216a`。PMC 同版清单 12 个对象为主文及元数据、六幅主图、补件和审稿 PDF，未列原始数据数组。正式数据声明指向论文及补件，原始数据与代码向通讯作者申请。DataCite 正式 DOI 精确关联返回 0 项。逐色轴向原始采样、相机 PSF 帧、MTF、Strehl 与效率积分区域待补。[PMC 文件目录](https://pmc-oa-opendata.s3.amazonaws.com/?prefix=PMC10761847.1) · [数据声明](https://pmc-oa-opendata.s3.amazonaws.com/PMC10761847.1/PMC10761847.1.pdf#page=9) · [DataCite 精确关联](https://api.datacite.org/dois?query=relatedIdentifiers.relatedIdentifier%3A%2210.1038%2Fs41467-023-44407-4%22)
