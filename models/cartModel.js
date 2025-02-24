const mysql = require('mysql2/promise'); // npm i mysql2 진행함

// DB 연결
const pool = mysql.createPool({
    host: "localhost", // DB가 설치된 호스트 IP 주소
    user:"root", // DB 접속 유저이름
    password: "0000", // DB 접속 비밀번호
    database: "site" // DB 이름
});

// 장바구니 상품 조회
const getCartItems = async () => {
    const query = `
        SELECT carts.id, carts.product_id, carts.quantity, 
               products.name, products.price, products.img_url 
        FROM carts
        JOIN products ON carts.product_id = products.id
    `;
    const [rows] = await pool.query(query);
    return rows;
};

// 장바구니에 상품 추가
const addCart = async (product_id, quantity) => {
    console.log("DB에 상품이랑 수량 저장:", product_id, quantity);
    const query = `
        INSERT INTO carts (product_id, quantity, img_url) 
        SELECT ?, ?, img_url FROM products WHERE id = ? 
        ON DUPLICATE KEY UPDATE quantity = quantity + ?, img_url = VALUES(img_url)
    `;
    const [result] = await pool.query(query, [product_id, quantity, product_id, quantity]);

    console.log("DB 저장 결과:", result);
    return result;
};

// 해당 아이디 가진 데이터 삭제
const deleteCart = async (id) => {
    const query = "DELETE FROM carts WHERE id = ?";
    try{
        await pool.query(query,[id]);
    } catch(error){
        console.log('삭제 실패');
    }
};

module.exports = { getCartItems, addCart, deleteCart };
