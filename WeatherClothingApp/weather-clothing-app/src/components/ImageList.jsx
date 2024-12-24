import React, { useState } from "react";

const ImageList = ({ temperature }) => {
    const [currentIndex, setCurrentIndex] = useState({
        winterHatIndex: 0,
        scarfIndex: 0,
        winterJacketIndex: 0,
        winterPantsIndex: 0,
        winterShoesIndex: 0,
    });  

    if (temperature === null || temperature === undefined) {
        return <p className="error-and-loading-text">Температура не получена.</p>;
    }

    const clothing = {
        winterClothing: {
            hats: [
                { id: 0, url: "/images/WinterClothing/WinterHats/Cap1.png", name: "Cap1" }, 
                { id: 1, url: "/images/WinterClothing/WinterHats/Cap2.png", name: "Cap2" }, 
                { id: 2, url: "/images/WinterClothing/WinterHats/Cap3.png", name: "Cap3" }, 
                { id: 3, url: "/images/WinterClothing/WinterHats/Cap4.png", name: "Cap4" }, 
                { id: 4, url: "/images/WinterClothing/WinterHats/Cap5.png", name: "Cap5" }, 
                { id: 5, url: "/images/Common/None-image.png", name: "None" }, 
            ],
            scarfs: [
                { id: 0, url: "/images/WinterClothing/Scarfs/Scarf1.png", name: "Scarf1" }, 
                { id: 1, url: "/images/WinterClothing/Scarfs/Scarf2.png", name: "Scarf2"  }, 
                { id: 2, url: "/images/WinterClothing/Scarfs/Scarf3.png", name: "Scarf3"  }, 
                { id: 3, url: "/images/WinterClothing/Scarfs/Scarf4.png", name: "Scarf4"  }, 
                { id: 4, url: "/images/WinterClothing/Scarfs/Scarf5.png", name: "Scarf5"  }, 
                { id: 5, url: "/images/Common/None-image.png", name: "None" }, 
            ],
            jackets: [
                { id: 0, url: "/images/WinterClothing/WinterJackets/WinterJacket1.png", name: "Jacket1" }, 
                { id: 1, url: "/images/WinterClothing/WinterJackets/WinterJacket2.png", name: "Jacket2" }, 
                { id: 2, url: "/images/WinterClothing/WinterJackets/WinterJacket3.png", name: "Jacket3" }, 
                { id: 3, url: "/images/WinterClothing/WinterJackets/WinterJacket4.png", name: "Jacket4" }, 
                { id: 4, url: "/images/WinterClothing/WinterJackets/WinterJacket5.png", name: "Jacket5" }, 
                { id: 5, url: "/images/Common/None-image.png", name: "None" }, 
            ],
            pants: [
                { id: 0, url: "/images/WinterClothing/WinterPants/WinterPants1.png", name: "Pants1" },
                { id: 1, url: "/images/WinterClothing/WinterPants/WinterPants2.png", name: "Pants2" },
                { id: 2, url: "/images/WinterClothing/WinterPants/WinterPants3.png", name: "Pants3" },
                { id: 3, url: "/images/WinterClothing/WinterPants/WinterPants4.png", name: "Pants4" },
                { id: 4, url: "/images/WinterClothing/WinterPants/WinterPants5.png", name: "Pants5" },
                { id: 5, url: "/images/Common/None-image.png", name: "None" }, 
            ],
            boots: [
                { id: 0, url: "/images/WinterClothing/WinterBoots/WinterBoots1.png", name: "Boots1" },
                { id: 1, url: "/images/WinterClothing/WinterBoots/WinterBoots2.png", name: "Boots2" },
                { id: 2, url: "/images/WinterClothing/WinterBoots/WinterBoots3.png", name: "Boots3" },
                { id: 3, url: "/images/WinterClothing/WinterBoots/WinterBoots4.png", name: "Boots4" },
                { id: 4, url: "/images/WinterClothing/WinterBoots/WinterBoots5.png", name: "Boots5" },
                { id: 5, url: "/images/Common/None-image.png", name: "None" }, 
            ],
        },
        rainClothing: {
            hats: [
                { id: 0, url: "/images/RainClothing/RainHats/Cap1.png", name: "Cap1" }, 
                { id: 1, url: "/images/RainClothing/RainHats/Cap2.png", name: "Cap2" }, 
                { id: 2, url: "/images/RainClothing/RainHats/Cap3.png", name: "Cap3" }, 
                { id: 3, url: "/images/RainClothing/RainHats/Cap4.png", name: "Cap4" }, 
                { id: 4, url: "/images/RainClothing/RainHats/Cap5.png", name: "Cap5" }, 
                { id: 5, url: "/images/Common/None-image.png", name: "None" }, 
            ],
        },
    };

    const getClothingForTemperature = (temp) => {
        const categories = [];
        if (temp <= 5) {
            categories.push(
                { category: "Winter Hats", items: clothing.winterClothing.hats },
                { category: "Scarfs", items: clothing.winterClothing.scarfs },
                { category: "Winter Jackets", items: clothing.winterClothing.jackets },
                { category: "Winter Pants", items: clothing.winterClothing.pants },
                { category: "Winter Boots", items: clothing.winterClothing.boots },
            );
        }
        return categories;
    };

    const clothingItems = getClothingForTemperature(temperature);

    if (!clothingItems.length) {
        return <p className="error-and-loading-text">No suitable clothing for this temperature.</p>;
    }

    const handlePrev = (categoryIndex) => {
        const categoryKey = Object.keys(currentIndex)[categoryIndex];
        setCurrentIndex(prevState => ({
            ...prevState,
            [categoryKey]: (prevState[categoryKey] - 1 + clothingItems[categoryIndex].items.length) % clothingItems[categoryIndex].items.length,
        }));
    };

    const handleNext = (categoryIndex) => {
        const categoryKey = Object.keys(currentIndex)[categoryIndex];
        setCurrentIndex(prevState => ({
            ...prevState,
            [categoryKey]: (prevState[categoryKey] + 1) % clothingItems[categoryIndex].items.length,
        }));
    };

    console.log(currentIndex); // Проверка текущих индексов
    console.log(clothingItems); // Проверка полученных категорий одежды

    return (
        <div className="image-list-container">
        {clothingItems.map((category, categoryIndex) => (
            <div key={category.category} className="clothing-category">
                <div className="image-slider">
                    <button onClick={() => handlePrev(categoryIndex)} className="nav-button prev-button">
                        &lt;
                    </button>
    
                    <div className="image-thumbnails">
                        <div className="image-preview">
                            <img
                                src={category.items[(currentIndex[Object.keys(currentIndex)[categoryIndex]] - 1 + category.items.length) % category.items.length].url}
                                alt={category.items[(currentIndex[Object.keys(currentIndex)[categoryIndex]] - 1 + category.items.length) % category.items.length].name}
                                className="image-item"
                            />
                        </div>
                    </div>
    
                    <button onClick={() => handleNext(categoryIndex)} className="nav-button next-button">
                        &gt;
                    </button>
                </div>
            </div>
        ))}
    </div>
    );
};

export default ImageList;