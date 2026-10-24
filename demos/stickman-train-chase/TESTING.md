# Báo cáo kiểm tra

Các kiểm tra đã chạy thực tế trong Chromium headless qua Playwright, truy cập HTTP cục bộ:

- 121 mốc từ 0 đến 30 giây, bước 0,25 giây: SVG được render, hai đầu nhân vật hiện diện; không có pageerror JavaScript.
- Play: thời gian tăng sau 0,5 giây. Pause: thời gian không đổi khi chờ thêm. Restart: trở về 0 và dừng.
- Từ 29,9 giây bấm Play: tự dừng đúng 30, `playing=false`.
- `node --check animation.js`: thành công.
- Xem ảnh chụp tại 8s, 9,6s, 16,5s, 25,3s và 28s để kiểm tra nhảy, đáp, né và trao vé. Đã sửa điểm đáp và khoảng cách hai người sau lần kiểm tra đầu.
- Vé đổi từ tay Xanh sang tay Đỏ tại 25,3s, ở cùng tọa độ màn hình. Hai nhân vật không đổi màu; không đảo trục máy quay.
- Render offline 720 frame SVG bằng Chromium, mã hóa FFmpeg H.264 ở 24fps. MP4 là bản im lặng.

Chạy lại kiểm tra trình duyệt (cần Playwright/Chromium đã cài, máy chủ cổng 8765 đang chạy): `node verify.cjs`.

Giới hạn: đây là hoạt hình procedural tạo dáng bằng khớp 2D, không phải mô phỏng cơ thể vật lý; một số thay đổi tư thế và góc máy dùng cut rõ. Chưa kiểm thử Safari/Firefox hoặc cảm ứng trên thiết bị thật. Kiểm tra lấy mẫu và ảnh chụp không thay thế đánh giá toàn bộ chuyển động bằng người xem. Không có âm thanh. Công cụ trình duyệt của môi trường chặn file://; HTTP cục bộ đã kiểm tra thành công.

Kết quả kiểm tra MP4 cuối bằng ffprobe: 1280×720, 24/1 fps, 720 frame, stream và container đều dài 30.000000 giây, 1.686.240 byte. FFmpeg giải mã toàn bộ video thành công, không báo lỗi. Không có audio stream.
