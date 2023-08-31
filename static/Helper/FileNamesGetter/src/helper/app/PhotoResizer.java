package helper.app;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

public class PhotoResizer {
    public static void photoResize(String path) throws IOException {
        File inputFile = new File(path);
        System.out.println(inputFile);
        BufferedImage originalImage = ImageIO.read(inputFile);

        File outputFile = new File("./output_compressed.jpg");

        float compressionQuality = 0.1f;

        ImageIO.write(originalImage, "jpg", outputFile);


    }
}
