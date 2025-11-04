// 智能添加作者，避免重复
const ZoteroPane = Zotero.getActiveZoteroPane();
const selected = ZoteroPane.getSelectedItems();

// 要添加的作者列表
const authorsToAdd = [
  { firstName: "何", lastName: "登成", creatorType: "author" },
];

for (const item of selected) {
  let existingCreators = item.getCreators();
  
  // 检查作者是否已存在
  const creatorsToAdd = authorsToAdd.filter(newAuthor => {
    return !existingCreators.some(existing => 
      existing.firstName === newAuthor.firstName && 
      existing.lastName === newAuthor.lastName
    );
  });
  
  if (creatorsToAdd.length > 0) {
    const updatedCreators = [...existingCreators, ...creatorsToAdd];
    item.setCreators(updatedCreators);
    await item.save();
  }
}

return selected.length + " 个条目已处理";