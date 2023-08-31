package helper.app;

import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.FileImageOutputStream;
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

        BufferedImage originalImage = ImageIO.read(inputFile);
        String extension = inputFile.getName().substring(
                inputFile.getName().lastIndexOf(".") + 1);

        File outputFile = new File("./output_compressed." + extension);

        float compressionQuality = 0.1f;


        System.out.println(extension);
        Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName(extension);
        ImageWriter writer = writers.next();

        ImageWriteParam param = writer.getDefaultWriteParam();
        param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
        param.setCompressionQuality(compressionQuality);

        FileImageOutputStream output = new FileImageOutputStream(outputFile);
        writer.setOutput(output);
        writer.write(null, new javax.imageio.IIOImage(originalImage, null,null), param);
        output.close();
        writer.dispose();

        outputFile = new File("./output_compressed." + extension);

        System.out.println(inputFile + "    " + inputFile.length() / 1024 + " KB to " + outputFile.length() / 1024);


    }
}
