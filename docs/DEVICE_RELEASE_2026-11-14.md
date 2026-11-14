# 手机与AR/VR矩阵首次整合发布

发布版本0.2.4，2026-11-14。整合PR #59–63，原研究贡献和逐格出处保留；此次新增使用功能，不伪装为全部重新测量。4款手机、12个摄像头配置、8款XR设备、25个字段；均为厂商规格，不是同条件实测或完整先进型号清单。

## 核验范围

复读当前全部结构化数值及前批边界笔记。通过官方页相关文本核Apple Camera、Samsung rear camera、Xiaomi Rear Camera、VIVE两款Headset specs、XREAL规格、VITURE比较表、Vision Pro Display/Chips、PSVR2 Display以及Meta比较表；没有读取所有厂商页面或独立实验。原厂链接、原读取日期与定位见data/devices.json。

Google原链接访问进入consent页，未绕过；合法US规格地址可读，完整核Wide/Ultrawide/Telephoto段，已有值一致，更新该来源为2026-11-14。其他来源保留前批核验日期，不借本次发布批量刷新。设备规格不代表画质得分；定义栏仍是字段口径说明，完整学术定义和重要性依据待补。

显示PPD与透视PPD、未明方向与水平/垂直FOV、双眼总像素与单眼、photon-to-photon与motion-to-photon分别保留。Xiaomi变焦焦段/光圈区间保留备注，不暗取中点；Apple主摄字段明确取最大光圈，完整档位保留。不能以全部字段可选为理由将未知值画成零。

## 功能与验证

新增散点/折线切换（按x数值排序；同x按y排序，连线仅辅助比较）、型号多选、列多选、目录/型号/轴排序、逐格来源、CSV与SVG导出、URL保存/恢复。空选择和缺失值保留为空；重合点共享坐标，完整型号在图例保留。CSV保留备注和出处，防公式注入；SVG带说明和完整图例文本。

106项测试、构建与差异检查通过。独立本机Google Chrome headless四视口1440/768/390/320：全部轴选择、三摄像头配置、XR、缺失与无点状态、型号/列多选、排序、刷新恢复、两个下载及主站入口通过。局部检查不替代实体手机或全浏览器/辅助技术覆盖。发布后须核实际devices.html/devices.js/devices-data.js和catalog文件，不仅看旧catalog指纹。

## 继续补齐

先进型号覆盖清单与检索纳排；第二长焦/前摄和可变档位；带条件独立SFR/MTF、动态范围、SNR、眩光及显示MTF/入眼亮度/眼盒/延迟；指标学术出处与任务级重要性。当前不设世界最佳或通用合格分。

## 实际发布验收

PR #65最终头652772094e85ec4f739bf98faf55ace39663dda0，CI43561626717成功；合并352c600170ac0431c6f631bff331d92d6f016867，保留#59–63全部祖先提交，相关PR已关闭。主线CI43561669480及Pages43561669359成功。

公开HTTPS的devices.html、devices.js、devices-data.js和catalog.json逐字节等于通过验收的dist。各文件SHA256分别为9d8b1467d814875b6b80840c8821fdf55197934ccbc8a68c695457a8d87daded、10e1b32d9f1c719cc759d7cb4bc4da186ddb60a0c56b8a42215190c152b073ee、83e2e10fa8add986c556711dc1a2e984e247cf470236c319878cdcf2384913cc、1cdeea0b65b4c65def6943fc51efe1a7ae3efad86211e7338097cc73dbcec995。

线上Google Chrome无头重复通过全部轴切换、三模组/XR、型号/列多选、排序、链接刷新恢复、CSV/SVG下载及四视口检查，无页面错误/溢出；已查看线上桌面XR及手机视图截图。此验收只证明本批功能和数据已发布，不关闭指标证据、市场覆盖或整体持续目标。
