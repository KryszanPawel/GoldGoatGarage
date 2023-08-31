package helper.app;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class PhotoResizer {
    public static void photoResize(String path) throws IOException {
        File inputFile = new File(path);
        String extension = inputFile.getName().substring(
                inputFile.getName().lastIndexOf(".") + 1);
        File outputFile = new File("./compressedFIle.png");
        long targetSizeBytes = 1024 * 1024;
        System.out.println(inputFile);
        BufferedImage image = ImageIO.read(inputFile);

        float compressionQuality = 1.0f;

        while(outputFile.length() > targetSizeBytes && compressionQuality > 0.1f){
            iterateCompressImage(image, outputFile, compressionQuality);
            compressionQuality -= 0.1f;
        }
    }

    private static void iterateCompressImage(BufferedImage image, File outputFile, float compressionQuality) throws IOException {
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
        ImageWriter writer = writers.next();
        ImageWriteParam param = writer.getDefaultWriteParam();
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(compressionQuality);

        ImageOutputStream outputStream = ImageIO.createImageOutputStream(outputFile);
        writer.setOutput(outputStream);
        writer.write(null, new IIOImage(image,null,null),param);

        outputStream.close();
        writer.dispose();
    }
}
