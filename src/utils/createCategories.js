const createCategories = (categories, parentId=null) => {

    const categoryList = [];
    let category;
    if (parentId === null){
        category = categories.filter(cat => cat.parentId === null);
    } else{
        category = categories.filter(cat => cat.parentId === parentId); 
    }

    for (cat of category){
        categoryList.push({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            parentId: cat.parentId,
            children: createCategories(categories, cat.id)
        });
    }

    return categoryList;
}

module.exports = {
    createCategories
}