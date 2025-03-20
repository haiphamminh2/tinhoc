
        // Dữ liệu menu với đường dẫn ảnh
        const menuItems = [
            {
                id: 1,
                name: 'Mỳ Cay',
                price: 45000,
                description: 'Mỳ cay Hàn Quốc với nhiều cấp độ cay',
                image: 'https://food.ibin.vn/images/data/product/mi-kim-chi-hai-san/mi-kim-chi-hai-san-002.jpg',
                badge: 'Bán chạy'
            },
            {
                id: 2,
                name: 'Bún Bò',
                price: 55000,
                description: 'Bún bò Huế đặc trưng, đậm đà',
                image: 'https://i2.ex-cdn.com/crystalbay.com/files/content/2024/08/15/bun-bo-hue-6-0935.jpeg'
            },
            {
                id: 3,
                name: 'Bánh Canh',
                price: 50000,
                description: 'Bánh canh cua thơm ngon',
                image: 'https://www.cleanipedia.com/images/5iwkm8ckyw6v/6ZzmagCQkHADBgZ1QvYO4F/3f6ceffac0e9f93f3667a3be7d23b835/dG9uZy1ob3AtMy1jYWNoLW5hdS1iYW5oLWNhbmgtY3VhLW5nb24tYmF0LWJhaS1jdWMtaGFwLWRhbi10YWktbmhhLmpwZw/1200w/b%C3%A1t-s%C3%BAp-h%E1%BA%A3i-s%E1%BA%A3n-v%E1%BB%9Bi-cua%2C-m%E1%BB%B1c%2C-v%C3%A0-c%C3%A1c-lo%E1%BA%A1i-th%E1%BB%B1c-ph%E1%BA%A9m-kh%C3%A1c..jpg'
            },
            {
                id: 4,
                name: 'Phở',
                price: 60000,
                description: 'Phở bò truyền thống',
                image: 'https://photrang.vn/wp-content/uploads/2025/02/phodacbiet-1608x1080.jpg',
                badge: 'Đặc sản'
            },
            {
                id: 5,
                name: 'Bún Riêu',
                price: 55000,
                description: 'Bún riêu cua đồng thơm ngon',
                image: 'https://i.vietgiaitri.com/2022/1/5/bun-rieu-cua-oc-mon-an-mang-dam-huong-vi-truyen-thong-4f4-6251397.jpg'
            },
            {
                id: 6,
                name: 'Nui Xào Bò',
                price: 65000,
                description: 'Nui xào bò thơm ngon, bổ dưỡng',
                image: 'https://i.ytimg.com/vi/OhazdED73oc/maxresdefault.jpg'
            },
            {
                id: 7,
                name: 'Cơm Tấm Sườn',
                price: 60000,
                description: 'Cơm tấm sườn nướng đặc trưng Sài Gòn',
                image: 'https://static.vinwonders.com/production/com-tam-sai-gon-thumb.jpg',
                badge: 'Mới'
            },
            {
                id: 8,
                name: 'Hủ Tiếu Nam Vang',
                price: 55000,
                description: 'Hủ tiếu kiểu Nam Vang thơm ngon',
                image: 'https://i-giadinh.vnecdn.net/2023/05/15/Bc8Thnhphm18-1684125639-9811-1684125654.jpg'
            }
        ];

        // Lấy giỏ hàng từ localStorage hoặc tạo mới nếu chưa có
        let cart = JSON.parse(localStorage.getItem('foodCart')) || [];

        // Các elements
        const cartToggle = document.getElementById('cart-toggle');
        const cartSection = document.getElementById('cart-section');
        const closeCart = document.getElementById('close-cart');
        const overlay = document.getElementById('overlay');
        const cartCount = document.getElementById('cart-count');
        const menuBtn = document.getElementById('menu-btn');
        const reservationBtn = document.getElementById('reservation-btn');
        const backToTopButton = document.getElementById('back-to-top');

        // Hàm chuyển đổi trang
        function switchPage(pageId) {
            // Ẩn tất cả các trang
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });

            // Hiển thị trang được chọn
            document.getElementById(pageId).classList.add('active');

            // Cập nhật trạng thái active cho menu
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            // Thêm class active cho link được chọn
            document.querySelector(`.nav-link[data-page="${pageId.replace('-page', '')}"]`).classList.add('active');

            // Cuộn lên đầu trang
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Hàm hiển thị menu
        function displayMenu() {
            const menuContainer = document.getElementById('menu-container');
            menuContainer.innerHTML = '';

            menuItems.forEach((item, index) => {
                const foodItem = document.createElement('div');
                foodItem.className = 'food-item animate__animated animate__fadeIn';
                foodItem.style.animationDelay = `${index * 0.1}s`;

                let badgeHTML = '';
                if (item.badge) {
                    badgeHTML = `<div class="food-badge">${item.badge}</div>`;
                }

                foodItem.innerHTML = `
                    ${badgeHTML}
                    <img src="${item.image}" alt="${item.name}" class="food-image">
                    <div class="food-info">
                        <div class="food-name">${item.name}</div>
                        <div class="food-description">${item.description}</div>
                        <div class="food-price">${formatCurrency(item.price)}</div>
                        <button class="add-to-cart" data-id="${item.id}">Thêm vào giỏ</button>
                    </div>
                `;
                menuContainer.appendChild(foodItem);
            });

            // Thêm sự kiện cho các nút "Thêm vào giỏ"
            const addButtons = document.querySelectorAll('.add-to-cart');
            addButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    addToCart(itemId);
                });
            });
        }

        // Hàm hiển thị giỏ hàng
        function displayCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');

            // Cập nhật số lượng trên biểu tượng giỏ hàng
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;

            if (cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart">Giỏ hàng của bạn đang trống</p>';
                cartTotal.textContent = formatCurrency(0);
                return;
            }

            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
                const itemTotal = menuItem.price * item.quantity;
                total += itemTotal;

                cartItem.innerHTML = `
                    <img src="${menuItem.image}" alt="${menuItem.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <div class="cart-item-name">${menuItem.name}</div>
                        <div class="cart-item-price">${formatCurrency(menuItem.price)}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <button class="remove-item" data-id="${item.id}">🗑️</button>
                    </div>
                `;

                cartItems.appendChild(cartItem);
            });

            cartTotal.textContent = formatCurrency(total);

            // Thêm sự kiện cho các nút trong giỏ hàng
            const decreaseButtons = document.querySelectorAll('.decrease');
            const increaseButtons = document.querySelectorAll('.increase');
            const removeButtons = document.querySelectorAll('.remove-item');

            decreaseButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateQuantity(itemId, -1);
                });
            });

            increaseButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    updateQuantity(itemId, 1);
                });
            });

            removeButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const itemId = parseInt(this.getAttribute('data-id'));
                    removeFromCart(itemId);
                });
            });
        }

        // Hàm thêm vào giỏ hàng
        function addToCart(itemId) {
            const existingItem = cart.find(item => item.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id: itemId, quantity: 1 });
            }

            saveCart();
            displayCart();

            // Hiệu ứng thông báo đã thêm vào giỏ
            const menuItem = menuItems.find(item => item.id === itemId);
            showNotification(`Đã thêm ${menuItem.name} vào giỏ hàng!`, 'success');

            // Mở giỏ hàng khi thêm sản phẩm
            openCart();
        }

        // Hàm cập nhật số lượng
        function updateQuantity(itemId, change) {
            const item = cart.find(item => item.id === itemId);

            if (item) {
                item.quantity += change;

                if (item.quantity <= 0) {
                    removeFromCart(itemId);
                } else {
                    saveCart();
                    displayCart();
                }
            }
        }

        // Hàm xóa khỏi giỏ hàng
        function removeFromCart(itemId) {
            cart = cart.filter(item => item.id !== itemId);
            saveCart();
            displayCart();
        }

        // Lưu giỏ hàng vào localStorage
        function saveCart() {
            localStorage.setItem('foodCart', JSON.stringify(cart));
        }

        // Định dạng tiền tệ
        function formatCurrency(amount) {
            return amount.toLocaleString('vi-VN') + '₫';
        }

        // Mở giỏ hàng
        function openCart() {
            cartSection.classList.add('active');
            overlay.classList.add('active');
        }

        // Đóng giỏ hàng
        function closeCartFunction() {
            cartSection.classList.remove('active');
            overlay.classList.remove('active');
        }

        // Function tạo mã QR thanh toán
        function generatePaymentQR(amount, orderInfo) {
            // Thông tin tài khoản cố định
            const bankCode = "Tpbank";
            const accountNumber = "Totuan6868";
            const accountName = "Quán Ăn LyLy";

            // Tạo addInfo từ thông tin đơn hàng
            const addInfo = `Thanh toan don hang #${orderInfo.invoiceNumber}`;

            // Tạo URL của mã QR
            const qrUrl = `https://img.vietqr.io/image/${bankCode}-${accountNumber}-compact2.jpg?amount=${amount}&addInfo=${encodeURIComponent(addInfo)}&accountName=${encodeURIComponent(accountName)}`;

            return qrUrl;
        }

        // Hàm hiển thị thông báo thay thế alert
        function showNotification(message, type = 'success', title = '') {
            // Xác định tiêu đề và biểu tượng dựa trên loại thông báo
            let icon = '✓';
            if (!title) {
                if (type === 'success') {
                    title = 'Thành công';
                    icon = '✓';
                } else if (type === 'error') {
                    title = 'Lỗi';
                    icon = '✕';
                } else if (type === 'warning') {
                    title = 'Cảnh báo';
                    icon = '⚠';
                } else if (type === 'info') {
                    title = 'Thông tin';
                    icon = 'ℹ';
                }
            }

            // Tạo modal
            const modalHTML = `
                <div id="notification-modal" class="notification-modal">
                    <div class="notification-content notification-${type}">
                        <div class="notification-icon">${icon}</div>
                        <div class="notification-title">${title}</div>
                        <div class="notification-message">${message}</div>
                        <button class="notification-button" id="notification-ok">OK</button>
                    </div>
                </div>
            `;

            // Thêm modal vào body
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer);

            // Hiển thị modal
            const modal = document.getElementById('notification-modal');
            modal.style.display = 'block';

            // Xử lý sự kiện đóng modal
            const okButton = document.getElementById('notification-ok');
            okButton.focus(); // Focus vào nút OK

            okButton.onclick = function () {
                document.body.removeChild(modalContainer);
            };

            // Đóng modal khi nhấn phím Enter
            document.addEventListener('keydown', function handleEnter(event) {
                if (event.key === 'Enter') {
                    document.body.removeChild(modalContainer);
                    document.removeEventListener('keydown', handleEnter);
                }
            });
        }

        // Hàm xác nhận thay thế confirm
        function showConfirmation(message, callback, title = 'Xác nhận') {
            // Tạo modal
            const modalHTML = `
                <div id="confirm-modal" class="confirm-modal">
                    <div class="confirm-content">
                        <div class="confirm-title">${title}</div>
                        <div class="confirm-message">${message}</div>
                        <div class="confirm-buttons">
                            <button class="confirm-cancel" id="confirm-cancel">Hủy</button>
                            <button class="confirm-ok" id="confirm-ok">Đồng ý</button>
                        </div>
                    </div>
                </div>
            `;

            // Thêm modal vào body
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer);

            // Hiển thị modal
            const modal = document.getElementById('confirm-modal');
            modal.style.display = 'block';

            // Xử lý sự kiện nút
            const cancelButton = document.getElementById('confirm-cancel');
            const okButton = document.getElementById('confirm-ok');

            okButton.focus(); // Focus vào nút OK

            cancelButton.onclick = function () {
                document.body.removeChild(modalContainer);
                if (callback) callback(false);
            };

            okButton.onclick = function () {
                document.body.removeChild(modalContainer);
                if (callback) callback(true);
            };

            // Xử lý phím tắt
            document.addEventListener('keydown', function handleKeydown(event) {
                if (event.key === 'Escape') {
                    document.body.removeChild(modalContainer);
                    if (callback) callback(false);
                    document.removeEventListener('keydown', handleKeydown);
                } else if (event.key === 'Enter') {
                    document.body.removeChild(modalContainer);
                    if (callback) callback(true);
                    document.removeEventListener('keydown', handleKeydown);
                }
            });
        }

        // Function hiển thị modal thanh toán QR
        function showPaymentQRModal(total, orderInfo) {
            // Tạo URL mã QR
            const qrUrl = generatePaymentQR(total, orderInfo);

            // Tạo modal hiển thị mã QR
            const modalHTML = `
                <div id="payment-modal" class="payment-modal">
                    <div class="payment-modal-content">
                        <span class="close-modal">&times;</span>
                        <h2>Thanh Toán Đơn Hàng</h2>
                        <div class="payment-details">
                            <p><strong>Mã đơn hàng:</strong> #${orderInfo.invoiceNumber}</p>
                            <p><strong>Tổng tiền:</strong> ${formatCurrency(total)}</p>
                            <p><strong>Ngân hàng:</strong> TPBank</p>
                            <p><strong>Số tài khoản:</strong> Totuan6868</p>
                            <p><strong>Tên tài khoản:</strong> Ẩm Thực Lyly</p>
                            <p><strong>Nội dung chuyển khoản:</strong> Thanh toan don hang #${orderInfo.invoiceNumber}</p>
                        </div>
                        <div class="qr-container">
                            <img src="${qrUrl}" alt="Mã QR thanh toán" class="payment-qr">
                        </div>
                        <p class="payment-note">Quét mã QR bằng ứng dụng ngân hàng để thanh toán</p>
                        <div class="payment-actions">
                            <button id="complete-order" class="complete-order-btn">Đã Thanh Toán</button>
                        </div>
                    </div>
                </div>
            `;

            // Thêm modal vào body
            const modalContainer = document.createElement('div');
            modalContainer.innerHTML = modalHTML;
            document.body.appendChild(modalContainer);

            // Hiển thị modal
            const modal = document.getElementById('payment-modal');
            modal.style.display = 'block';

            // Xử lý sự kiện đóng modal
            const closeBtn = document.querySelector('.close-modal');
            closeBtn.onclick = function () {
                document.body.removeChild(modalContainer);
            };

            // Xử lý sự kiện khi nhấn nút đã thanh toán
            const completeBtn = document.getElementById('complete-order');
            completeBtn.onclick = function () {
                // Xóa giỏ hàng
                cart = [];
                saveCart();
                displayCart();

                // Đóng modal
                document.body.removeChild(modalContainer);

                // Đóng giỏ hàng
                closeCartFunction();

                // Thông báo cảm ơn
                showNotification('Đơn hàng của bạn đã được đặt thành công! Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.', 'success', 'Đặt hàng thành công');
            };
        }

        // Tạo hóa đơn
        function createInvoice() {
            // Kiểm tra giỏ hàng có trống không
            if (cart.length === 0) {
                showNotification('Giỏ hàng của bạn đang trống!', 'warning');
                return false;
            }

            // Lấy thời gian hiện tại
            const now = new Date();
            const invoiceNumber = 'INV' + now.getTime().toString().slice(-6);
            const invoiceDate = now.toLocaleDateString('vi-VN');
            const invoiceTime = now.toLocaleTimeString('vi-VN');

            // Cập nhật thông tin hóa đơn
            document.getElementById('invoice-number').textContent = invoiceNumber;
            document.getElementById('invoice-date').textContent = invoiceDate;
            document.getElementById('invoice-time').textContent = invoiceTime;

            // Tính tổng tiền và hiển thị các món ăn
            const invoiceItems = document.getElementById('invoice-items');
            invoiceItems.innerHTML = '';

            let total = 0;

            cart.forEach(item => {
                const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
                const itemTotal = menuItem.price * item.quantity;
                total += itemTotal;

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${menuItem.name}</td>
                    <td>${formatCurrency(menuItem.price)}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(itemTotal)}</td>
                `;

                invoiceItems.appendChild(tr);
            });

            document.getElementById('invoice-total').textContent = formatCurrency(total);

            return {
                success: true,
                invoiceNumber: invoiceNumber,
                total: total
            };
        }

        // Sự kiện mở/đóng giỏ hàng
        cartToggle.addEventListener('click', openCart);
        closeCart.addEventListener('click', closeCartFunction);
        overlay.addEventListener('click', closeCartFunction);

        // Sự kiện thanh toán
        document.getElementById('checkout-btn').addEventListener('click', function () {
            if (cart.length === 0) {
                showNotification('Giỏ hàng của bạn đang trống!', 'warning');
                return;
            }

            // Tính tổng tiền
            const total = cart.reduce((sum, item) => {
                const menuItem = menuItems.find(menuItem => menuItem.id === item.id);
                return sum + (menuItem.price * item.quantity);
            }, 0);

            // Tạo thông tin đơn hàng
            const now = new Date();
            const orderInfo = {
                invoiceNumber: 'INV' + now.getTime().toString().slice(-6),
                date: now.toLocaleDateString('vi-VN'),
                time: now.toLocaleTimeString('vi-VN')
            };

            // Hiển thị modal thanh toán QR
            showPaymentQRModal(total, orderInfo);
        });

        // Sự kiện chuyển trang
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page') + '-page';
                switchPage(pageId);
            });
        });

        // Sự kiện cho các liên kết trong footer
        document.querySelectorAll('.footer-links a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page') + '-page';
                switchPage(pageId);
            });
        });

        // Sự kiện cho nút menu và đặt bàn trong header
        menuBtn.addEventListener('click', function () {
            switchPage('menu-page');
        });

        reservationBtn.addEventListener('click', function () {
            switchPage('reservation-page');
        });

        // Sự kiện cho form đặt bàn
        document.getElementById('reservation-form').addEventListener('submit', function (e) {
            e.preventDefault();

            // Lấy dữ liệu từ form
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Hiển thị thông báo xác nhận
            // Hiển thị thông báo xác nhận
            showNotification(
                `Cảm ơn ${name} đã đặt bàn! Chúng tôi đã nhận được thông tin đặt bàn của bạn vào ngày ${date} lúc ${time} cho ${guests} người. Chúng tôi sẽ liên hệ với bạn qua số điện thoại ${phone} để xác nhận.`,
                'success',
                'Đặt bàn thành công!'
            );

            // Reset form
            this.reset();
        });

        // Sự kiện cho form liên hệ
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();

            // Lấy dữ liệu từ form
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;

            // Hiển thị thông báo xác nhận
            showNotification(
                `Cảm ơn ${name} đã gửi tin nhắn cho chúng tôi! Chúng tôi sẽ phản hồi qua email ${email} trong thời gian sớm nhất.`,
                'success',
                'Gửi tin nhắn thành công!'
            );

            // Reset form
            this.reset();
        });

        // Sự kiện cho form đăng ký nhận tin
        document.querySelector('.newsletter-form').addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('.newsletter-input').value;

            showNotification(
                `Cảm ơn bạn đã đăng ký nhận thông tin từ Quán ăn LyLy! Chúng tôi sẽ gửi các thông tin khuyến mãi và món ăn mới đến email ${email}.`,
                'success',
                'Đăng ký thành công!'
            );

            // Reset form
            this.reset();
        });

        // Xử lý nút Back to Top
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Khởi tạo trang
        displayMenu();
        displayCart();

        // Đặt ngày mặc định cho form đặt bàn
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        if (document.getElementById('date')) {
            document.getElementById('date').min = formattedDate;
            document.getElementById('date').value = formattedDate;
        }

        // Xử lý animation khi scroll
        function handleScrollAnimations() {
            const elements = document.querySelectorAll('.animate__animated');

            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;

                if (elementPosition < screenPosition) {
                    const animationClass = element.classList.contains('animate__fadeIn') ? 'animate__fadeIn' :
                        element.classList.contains('animate__fadeInUp') ? 'animate__fadeInUp' :
                            element.classList.contains('animate__fadeInDown') ? 'animate__fadeInDown' : '';

                    if (animationClass && !element.classList.contains('animated')) {
                        element.classList.add('animated');
                    }
                }
            });
        }

        window.addEventListener('scroll', handleScrollAnimations);
        window.addEventListener('load', handleScrollAnimations);
    
