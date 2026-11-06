# 维护方法

1. 在 `data/sources/` 创建来源条目：使用稳定 id、原始 URL、DOI（有则填）、章节/图表/公式/页码、读取版本和范围、核验日期。
2. 在 `data/metrics/` 写定义、单位、优化方向及不可省略的比较条件，`definition_refs` 必须指向来源。
3. 更新应用的指标导航；它是候选检索集合。`priorities` 只有证据足够时才填，并说明任务。
4. `basis=editorial_synthesis` 表示有出处的编辑性判断。若采用 `author_explicit`，必须补 `explicit_rank_location`，可以在原文找到顺序，不能只给泛泛引用。
5. 产品/论文结果放 `data/benchmarks/`；明确实验、模拟或厂商声明，保留效率分母、积分圈、光谱、焦面、NA、孔径和缺失项。
6. 最佳声明放 `data/scoped_bests.json`：允许 `author_reported_best`、`theoretical_bound`、`corpus_best`。本库最优还需至少两个候选及比较协议。缺字段不能按通配符处理。
7. 修改 `data/catalog.json` 版本、日期；在 CHANGELOG.md 记录具体结论变化和来源。
8. 运行 `npm test && npm run build`，检查 `dist` 差异，连同源数据提交 PR。
9. 审核通过后合并；按 README 发布到既有私有 Sites。源数据更新不会自行把站点开放给所有人。

## 阅读核验

每个重要数字至少绑定一个能直接支撑它的原文位置。仅有摘要/搜索索引时就标明该范围。引用文章讨论的指标，不意味着文章给出了它的重要性名次。

原始研究优先于百科；综述用于寻找候选文献，纪录尽量回原始研究。标准条款判断以适用正式标准为准，优先级不是机械的“论文胜过标准”。

## 链接检查

`npm run check:links` 是可选的只读网络检查；403、429、验证码与网络失败只说明暂时不可访问，不说明科学结论错误。检查不会修改内容或自动提升核验等级。
