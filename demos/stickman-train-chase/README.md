# Stickman Train Chase

Demo SVG/JavaScript độc lập, 1280 × 720, 30 giây. Không tải thư viện, font hoặc dịch vụ bên ngoài. Không sửa Skill gốc.

## Xem demo

Mở `index.html` bằng trình duyệt, bấm **Play**. **Pause** dừng, **Restart** trở về đầu và dừng; thanh tiến trình cho phép tua chính xác. Dừng tự động tại 30.00 giây, không lặp. Tab bị trình duyệt hạn chế tốc độ có thể bỏ qua frame; timeline vẫn tính theo thời gian thực.

Nếu trình duyệt/chính sách môi trường chặn file cục bộ:

```sh
cd /workspace/seedance-tvc-director/demos/stickman-train-chase
python3 -m http.server 8765 --bind 127.0.0.1
```

Sau đó truy cập địa chỉ máy chủ cục bộ cổng 8765 trong trình duyệt.

## Nội dung

0–3s: vé rơi, Xanh nhặt và đuổi Đỏ. 3–7s: rượt trên mái tàu. 7–11s: lần lượt nhảy khe toa. 11–15s: Đỏ chao đảo rồi lấy lại thăng bằng. 15–19s: cúi tránh biển báo. 19–23s: tăng tốc. 23–26s: dừng lại và trao vé. 26–30s: nhận ra hiểu nhầm, cùng cười.

Bối cảnh đã chuyển từ trong toa lên nóc tàu theo yêu cầu mới. Áp dụng nguyên tắc hook, một hướng chuyển động, hoàn tất động tác và twist của Seedance TVC Director; không áp dụng packshot thương mại. Hai nhân vật đỏ/xanh, kích thước cơ thể không đổi trong tọa độ cảnh; zoom máy quay thay đổi tỷ lệ hiển thị đồng thời. Không có âm thanh trong bản này.

## Xuất MP4

`render.cjs` là công cụ tùy chọn cho môi trường đã có Node.js, Playwright, Chromium và FFmpeg. Không cần các công cụ này để xem HTML. Khởi động máy chủ như trên, sau đó:

```sh
node render.cjs
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate,nb_frames,duration -of json stickman-train-chase.mp4
```

Có thể đặt `CHROMIUM_PATH` và `DEMO_URL`. Export 720 frame ở 24 fps, H.264/yuv420p, không âm thanh. Ảnh cuối ở 29 + 23/24 giây được giữ đến đúng mốc 30 giây theo thời lượng frame.

## Kiểm tra

Xem `TESTING.md` để biết các kiểm tra thực sự đã chạy và giới hạn. Hàm `window.chase.seek(seconds)` và `window.chase.render(seconds)` hỗ trợ kiểm tra xác định theo thời gian. Hoạt ảnh dùng joint chung vai/khuỷu/tay và hông/gối/chân nên đường chi không đứt tại các tư thế; chuyển một số tư thế là cut có chủ đích, không phải mô phỏng vật lý.

## Commit đề xuất

Chỉ stage thư mục demo; kiểm tra dung lượng MP4 trước khi quyết định lưu binary bằng Git hay đính kèm ở release. Không push upstream trong quá trình tạo demo.
