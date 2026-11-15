# Du2025：下一批原作与补充材料检查点

本文件为原作入口初查的历史快照；后续已完成[001v有限批次/发布验收](DU_2025_REVIEW_2026-11-15.md)，当前下一篇见[Ndao2020检查点](NDAO_2020_NEXT_CHECKPOINT_2026-11-15.md)。原始初查边界保留，不作为当前未读状态。

QUALITY-001v；2026-11-15。接续新云补检001u，长期目标active，具名任务只放待办与日志。

## 入选与去重

本次实际读到的Javed2026 SI p.13 **ref.7**直接引用：Du et al., *Full-Color Quasi-Achromatic Imaging with a Dual-Functional Metasurface*, **Nano Letters25(20),8143–8150(2025)**，DOI **10.1021/acs.nanolett.5c00695**。拟补较新的可见光实制/双偏振/图像减法结果，需区分裸PSF与处理后成像，不按S4比较表抄数。当前25个study无本篇；用户只读08_references文件名按quasi/5c00695/du.*2025无匹配，只是文件名范围，不称已全文穷尽去重。未用引用量或影响因子。

[Crossref主DOI元数据](https://api.crossref.org/works/10.1021/acs.nanolett.5c00695)实际200，核题名/作者、线上**2025-04-18**、25(20)/8143–8150。[EuropePMC精确DOI查询](https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=DOI:10.1021/acs.nanolett.5c00695&format=json)200/一匹配，PMID40248883，当前inPMC=N，未得PMCID；不是没有作者全文或SI的证据。不使用该响应里的引用量。

## 已取得与实际读取边界

1. 独立无头Google Chrome导航[ACS主文](https://pubs.acs.org/doi/10.1021/acs.nanolett.5c00695)及[Supplement入口](https://pubs.acs.org/doi/suppl/10.1021/acs.nanolett.5c00695)均403/检查页；未处理验证码/登录。搜索只作定位，未用第三方正文/学校代理结果取性能数值。
2. [Tao Li课题组2025出版列表](https://taoli.nju.edu.cn/2025/list.htm)实际200/4359字符；DOM核**第11条**同题/作者/DOI，所在`.news_con`内的Download PDF指向[作者公开PDF](https://taoli.nju.edu.cn/_upload/article/files/58/60/9abdfdab48009b2d46ef1b8d883f/41497d36-d7a2-4e21-a0ab-8ac9069f0308.pdf)，不是按链接顺序猜文件。
3. 该PDF实际200，**7899845字节、8页、有效%PDF**；SHA256 **01602926b7f74ae4fbe2d61fbcc948b25e2b3893f25d9255bf7432bb0597cecb**。只检查metadata、第一页题名/作者/DOI与摘要文本，以及`pdfinfo -url`附件链接。尚未读方法/结果/图表或视觉核原图；不得称已精读，也未填写任何器件或性能值。PDF首页为发表初期在线版布局（CiteThis DOI，非正式页段印字），题录卷期页由Crossref另核，不靠页数反造页码。
4. PDF p.2等注释实际列出[SI nl5c00695_si_001.pdf](https://pubs.acs.org/doi/suppl/10.1021/acs.nanolett.5c00695/suppl_file/nl5c00695_si_001.pdf)。独立下载请求403/5943字节检查页，未保存为有效PDF、未取得/读取SI。可继续查出版方公开SI或作者正式存档，不能把曲线图当原始数组。

本机暂存`/tmp/lens-mtf-audit/du2025-crossref.json`、`du2025-epmc.json`、`du2025-author-entry.json`、`du2025-author-main.pdf`、`du2025-first-page.txt`。不提交全文，不操作用户Chrome登录资料/标签，不联系作者。

## 下一批具体读取

按宏观定位→方法拆解→图表解读→批判与迁移读原作：先核制成器件口径/NA与Bessel长焦深参数、实际谱点/偏振、固定评价面与焦位定义；再核PSF/FWHM、MTF/对比度、效率积分/分母及图像减法的强度系数、SNR定义/ROI。模拟、实测原图与处理结果分行，不把长焦深写成精确零残余色差，不从图估值。原始PSF/采样/处理若可公开取得，单独核能否复算MTF；若仍仅图，保留定位和缺口。全文/SI去重和图表视觉核完成后再录入、测试、PR/Pages/无头Chrome验收。
